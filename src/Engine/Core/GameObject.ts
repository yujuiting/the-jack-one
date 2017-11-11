import { BaseObject } from 'Engine/Core/BaseObject';
import { Component } from 'Engine/Core/Component';
import { Type, Tag, Layer, BuiltInLayer, getType } from 'Engine/Utility/Type';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { addToArray,
         removeFromArray,
         includeInArray } from 'Engine/Utility/ArrayUtility';
import { Tree } from 'Engine/Utility/Tree';
import { instantiate } from 'Engine/runtime';
import { GameObjectInitializer } from 'Engine/Core/GameObjectInitializer';
import { Class } from 'Engine/Decorator/Class';
import { Inject } from 'Engine/Decorator/Inject';
import { which } from 'shelljs';

/**
 * Basic game object in engine
 *
 * # Lifecycle
 *  - reset
 *    Called when constructing or will recycling.
 *  - destroy
 *    Called when game object destroy.
 *  - start
 *    Called before first update called.
 *  - fixUpdate
 *  - update
 *  - preRender
 *  - postRender
 */
@Class()
export class GameObject extends BaseObject {

  public static FindWithTag(tag: Tag): ReadonlySet<GameObject> {
    return this.GetBucketByTag(tag);
  }

  public static Initialize(gameObject: GameObject): void {
    gameObject.initialize();
  }

  private static TaggedGameObjects: Map<Tag, Set<GameObject>> = new Map();

  private static AddTaggedGameObject(gameObject: GameObject, tag: Tag): ReadonlySet<GameObject> {
    const bucket = this.GetBucketByTag(tag);
    return bucket.add(gameObject);
  }

  private static RemoveTaggedGameObject(gameObject: GameObject, tag: Tag): boolean {
    const bucket = this.GetBucketByTag(tag);
    return bucket.delete(gameObject);
  }

  private static GetBucketByTag(tag: Tag): Set<GameObject> {
    let bucket = this.TaggedGameObjects.get(tag);
    if (!bucket) {
      bucket = new Set();
      this.TaggedGameObjects.set(tag, bucket);
    }

    return bucket;
  }

  public layer: Layer;

  private _node: Tree<GameObject>;

  private _transform: TransformComponent;

  private components: Map<Type<Component>, Set<Component>>;

  private tags: Set<Tag>;

  public get node(): Tree<GameObject> { return this._node; }

  public get transform(): TransformComponent { return this._transform; }

  public get parent(): GameObject|undefined {
    return this._node.parent ? this._node.parent.data : undefined;
  }

  public get children(): ReadonlyArray<GameObject> {
    return this._node.children.map(node => node.data);
  }

  public get isActive(): boolean {
    // lookup parent
    if (this.parent && !this.parent.isActive) {
      return false;
    }

    return this._isActive;
  }

  constructor(@Inject(GameObjectInitializer) gameObjectInitializer: GameObjectInitializer) {
    super();
    gameObjectInitializer.push(this);
  }

  /**
   * Reset game object, ensure reset after destroy.
   */
  public reset(): void {
    super.reset();
    this.layer = BuiltInLayer.Default;
    this._node = new Tree(this);
    this.components = new Map();
    this.tags = new Set();
    this._transform = this.addComponent(TransformComponent);
  }

  /**
   * Destroy all children and components and release references.
   */
  public destroy(): void {
    super.destroy();

    // destroy all children before clear
    this.children.forEach(child => child.destroy());
    this._node.clear();

    delete this._transform;
    this.components.forEach(components => components.forEach(component => component.destroy()));
    this.components.clear();

    this.tags.forEach(tag => GameObject.RemoveTaggedGameObject(this, tag));
  }

  public hasTag(tag: Tag): boolean {
    return this.tags.has(tag);
  }

  public addTag(tag: Tag): void {
    this.tags.add(tag);
    GameObject.AddTaggedGameObject(this, tag);
  }

  public removeTag(tag: Tag): void {
    if (this.tags.delete(tag)) {
      GameObject.RemoveTaggedGameObject(this, tag);
    }
  }

  public addComponent<T extends Component>(ComponentType: Type<T>): T {
    const RequireComponentTypes: Type<Component>[] = Reflect.getMetadata('component:require', ComponentType) || [];

    RequireComponentTypes.forEach(RequireComponentType => {
      if (!this.getComponent(RequireComponentType)) {
        throw new Error(`${ComponentType.name} require component ${RequireComponentType.name}`);
      }
    });

    const components = <Set<T>>this.getComponents(ComponentType);
    const isUnique = Reflect.getMetadata('component:unique', ComponentType) || false;

    if (isUnique && components.size > 0) {
      throw new Error(`Unique component ${ComponentType.name}`);
    }

    const component = instantiate(ComponentType, this);

    if (this.hasStarted) {
      component.start();
    }

    components.add(component);

    this.components.set(ComponentType, components);

    return component;
  }

  public removeComponent(component: Component): void {
    const ComponentType = getType(component);
    const components = this.components.get(ComponentType);
    if (!components || !components.has(component)) {
      throw new Error(`Not found components, ${component.name}`);
    }
    components.delete(component);
    component.destroy();
  }

  public getComponent<T extends Component>(ComponentType: Type<T>): T|undefined {
    /**
     * If you occur error `Uncaught TypeError: Cannot read property 'get' of undefined`.
     * It's probably you forgot to call super.reset() in you reset method.
     */
    const components = this.components.get(ComponentType);
    if (!components) {
      return;
    }

    return <T>components.values().next().value;
  }

  public getComponents<T extends Component>(ComponentType: Type<T>): ReadonlySet<T> {
    if (this.components.has(ComponentType)) {
      return <Set<T>>this.components.get(ComponentType);
    } else {
      const components = new Set<T>();
      const componentTypes = this.components.keys();
      let iteratorResult = componentTypes.next();
      while (!iteratorResult.done) {
        // key of this.components if class type
        // use prototype to check it is descendants of searched component type
        if (iteratorResult.value.prototype instanceof ComponentType) {
          (<Set<Component>>this.components.get(iteratorResult.value))
            .forEach(component => components.add(<T>component));
        }
        iteratorResult = componentTypes.next();
      }
      return components;
    }
  }

  public addChild(child: GameObject): void {
    if (this._node.hasChild(child._node)) {
      throw new Error(`Repeatly add child, ${child}`);
    }

    if (child._node.parent) {
      child._node.parent.remove(child._node);
    }

    this._node.add(child._node);
    child._transform.localPosition.copy(child._transform.position);
  }

  public removeChild(child: GameObject): void {
    if (!this._node.hasChild(child._node)) {
      throw new Error(`Not found child, ${child}`);
    }

    this._node.remove(child._node);
  }

  public activate(): void {
    super.activate();
    this._node.show();
  }

  public deactivate(): void {
    super.deactivate();
    /**
     * Temporary hide this node from parent.
     * If parent has no visibility to this node, this ndoe would not be update lifecycle.
     */
    this.node.hide();
  }

  /**
   * @inheritdoc
   */
  public start(): void {
    super.start();
    this.components.forEach(components => components.forEach(component => component.start()));
  }

  /**
   * @inheritdoc
   */
  public fixedUpdate(alpha: number = 1): void {
    this.components.forEach(components => components.forEach(component => component.fixedUpdate(alpha)));
  }

  /**
   * @inheritdoc
   */
  public update(): void {
    this.components.forEach(components => components.forEach(component => component.update()));
  }

  /**
   * @inheritdoc
   */
  public lateUpdate(): void {
    this.components.forEach(components => components.forEach(component => component.lateUpdate()));
  }

  /**
   * @inheritdoc
   */
  public preRender(): void {
    this.components.forEach(components => components.forEach(component => component.preRender()));
  }

  /**
   * @inheritdoc
   */
  public postRender(): void {
    this.components.forEach(components => components.forEach(component => component.postRender()));
  }

  public toString(): string {
    return `GameObject(${this.id})`;
  }

  /**
   * GameObjectInitializer will call this method when initializing.
   */
  private initialize(): void {
    this.start();
  }

}
