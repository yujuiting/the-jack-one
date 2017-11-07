import { BaseObject } from 'Engine/Core/BaseObject';
import { Component } from 'Engine/Core/Component';
import { Type, Tag, Layer, BuiltInLayer } from 'Engine/Utility/Type';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { addToArray,
         removeFromArray,
         includeInArray } from 'Engine/Utility/ArrayUtility';
import { Tree } from 'Engine/Utility/Tree';
import { instantiate } from 'Engine/runtime';
import { GameObjectInitializer } from 'Engine/Core/GameObjectInitializer';
import { Class } from 'Engine/Decorator/Class';
import { Inject } from 'Engine/Decorator/Inject';

/**
 * Basic class in engine
 */
@Class()
export class GameObject extends BaseObject {

  public static FindWithTag(tag: Tag): ReadonlyArray<GameObject> {
    return this.GetBucketByTag(tag);
  }

  private static TaggedGameObjects: Map<Tag, GameObject[]> = new Map();

  private static AddTaggedGameObject(gameObject: GameObject, specificTag?: Tag): void {
    if (specificTag) {
      const bucket = this.GetBucketByTag(specificTag);
      addToArray(bucket, gameObject);
    } else {
      gameObject.tags.forEach(tag => {
        const bucket = this.GetBucketByTag(tag);
        addToArray(bucket, gameObject);
      });
    }
  }

  private static RemoveTaggedGameObject(gameObject: GameObject, specificTag?: Tag): void {
    if (specificTag) {
      const bucket = this.GetBucketByTag(specificTag);
      removeFromArray(bucket, gameObject);
    } else {
      gameObject.tags.forEach(tag => {
        const bucket = this.GetBucketByTag(tag);
        removeFromArray(bucket, gameObject);
      });
    }
  }

  private static GetBucketByTag(tag: Tag): GameObject[] {
    let bucket = this.TaggedGameObjects.get(tag);
    if (!bucket) {
      bucket = [];
      this.TaggedGameObjects.set(tag, bucket);
    }

    return bucket;
  }

  public layer: Layer = BuiltInLayer.Default;

  public readonly node: Tree<GameObject> = new Tree(this);

  public readonly transform: TransformComponent;

  private components: Component[] = [];

  private tags: Tag[] = [];

  public get parent(): GameObject|null {
    return this.node.parent ? this.node.parent.data : null;
  }

  public get children(): ReadonlyArray<GameObject> {
    return this.node.children.map(node => node.data);
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
    this.transform = this.addComponent(TransformComponent);
    gameObjectInitializer.push(this);
  }

  public hasTag(tag: Tag): boolean {
    return includeInArray(this.tags, tag);
  }

  public addTag(tag: Tag): void {
    if (addToArray(this.tags, tag)) {
      GameObject.AddTaggedGameObject(this, tag);
    }
  }

  public removeTag(tag: Tag): void {
    if (removeFromArray(this.tags, tag)) {
      GameObject.RemoveTaggedGameObject(this, tag);
    }
  }

  public addComponent<T extends Component>(ComponentType: Type<T>): T {
    const isUnique = Reflect.getMetadata('component:unique', ComponentType) || false;

    if (isUnique && this.getComponent(ComponentType)) {
      throw new Error(`Unique component ${ComponentType}`);
    }

    const RequireComponentTypes: Type<Component>[] = Reflect.getMetadata('component:require', ComponentType) || [];

    RequireComponentTypes.forEach(RequireComponentType => {
      if (!this.getComponent(RequireComponentType)) {
        throw new Error(`${ComponentType} require component ${RequireComponentType}`);
      }
    });

    const component = instantiate(ComponentType, this);

    if (this._hasStarted) {
      component.start();
    }

    this.components.push(component);

    return component;
  }

  public removeComponent(component: Component): void {
    if (!removeFromArray(this.components, component)) {
      throw new Error(`Not found components, ${component}`);
    }

    component.destroy();
  }

  public getComponent<T extends Component>(componentType: Type<T>): T|undefined {
    return <T>this.components.find(component => component instanceof componentType);
  }

  public getComponents<T extends Component>(componentType: Type<T>): T[] {
    return <T[]>this.components.filter(component => component instanceof componentType);
  }

  public addChild(child: GameObject): void {
    if (this.node.hasChild(child.node)) {
      throw new Error(`Repeatly add child, ${child}`);
    }

    if (child.node.parent) {
      child.node.parent.remove(child.node);
    }

    this.node.add(child.node);
    child.transform.localPosition.copy(child.transform.position);
  }

  public removeChild(child: GameObject): void {
    if (this.node.hasChild(child.node)) {
      throw new Error(`Not found child, ${child}`);
    }

    this.node.remove(child.node);
  }

  public activate(): void {
    super.activate();
    this.node.show();
  }

  public deactivate(): void {
    super.deactivate();
    this.node.hide();
  }

  /**
   * @inheritdoc
   */
  public start(): void {
    super.start();
    this.components.forEach(component => component.start());
  }

  /**
   * @inheritdoc
   */
  public fixedUpdate(alpha: number = 1): void {
    this.components.forEach(component => component.fixedUpdate(alpha));
  }

  /**
   * @inheritdoc
   */
  public update(): void {
    this.components.forEach(component => component.update());
  }

  /**
   * @inheritdoc
   */
  public lateUpdate(): void {
    this.components.forEach(component => component.lateUpdate());
  }

  /**
   * @inheritdoc
   */
  public preRender(): void {
    this.components.forEach(component => component.preRender());
  }

  /**
   * @inheritdoc
   */
  public postRender(): void {
    this.components.forEach(component => component.postRender());
  }

  /**
   * @inheritdoc
   */
  public reset(): void {
    super.reset();
    this.layer = BuiltInLayer.Default;
    this.components = [];
    this.tags = [];
    this._hasStarted = false;
    this.components.forEach(component => component.reset());
    this.children.forEach(child => child.reset());
  }

  /**
   * @inheritdoc
   */
  public destroy(): void {
    super.destroy();
    GameObject.RemoveTaggedGameObject(this);
    this.components.forEach(component => component.destroy());
    this.children.forEach(child => child.destroy());
    if (this.node.parent) {
      this.node.parent.remove(this.node);
    }
  }

  public toString(): string {
    return `GameObject(${this.id})`;
  }

  public initialize(): void {
    this.start();
  }

}
