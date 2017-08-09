import { BaseObject } from 'Engine/Base/BaseObject';
import { GameObject } from 'Engine/Base/GameObject';
import { Tree, ReadonlyTree } from 'Engine/Utility/Tree';
import { Pool } from 'Engine/Utility/Pool';
import { Resource } from 'Engine/Resource/Resource';
import { Bundle } from 'Engine/Resource/Bundle';
import { Camera, MainCamera } from 'Engine/Base/Camera';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';
import { Inject } from 'Engine/Decorator/Inject';
import { BroadPhaseCollisionResolver } from 'Engine/Physics/BroadPhaseCollisionResolver';
import { NarrowPhaseCollisionResolver } from 'Engine/Physics/NarrowPhaseCollisionResolver';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Vector } from 'Engine/Math/Vector';

/**
 * Scene manage game objects and resources.
 */
export class Scene extends BaseObject {

  public readonly resources: Bundle = new Bundle();

  /**
   * Game objects store as a tree.
   * If a parent was deactivated, all children of it will be deactivated.
   */
  private readonly gameObjects: Tree<GameObject> = new Tree<GameObject>(<any>null);

  private cameras: Camera[] = [];

  @Inject(MainCamera)
  public mainCamera: Camera;

  @Inject(BroadPhaseCollisionResolver)
  private broadPhaseCollisionResolver: BroadPhaseCollisionResolver;

  @Inject(NarrowPhaseCollisionResolver)
  private narrowPhaseCollisionResolver: NarrowPhaseCollisionResolver;

  public get isLoaded(): boolean { return this.resources.isLoaded; }

  constructor() {
    super();
    this.add(this.mainCamera);
  }

  public add(gameObject: GameObject, at?: Vector): boolean {
    if (!this.gameObjects.add(gameObject.node)) {
      return false;
    }

    if (gameObject instanceof Camera) {
      addToArray(this.cameras, gameObject);
    }

    const collider = gameObject.getComponent(ColliderComponent);

    if (collider) {
      this.broadPhaseCollisionResolver.track(collider);
    }

    if (at) {
      gameObject.transform.position.copy(at);
    }

    gameObject.start();

    return true;
  }

  public remove(gameObject: GameObject): boolean {
    if (!this.gameObjects.remove(gameObject.node)) {
      // It may return false if this game object's parent is not scene root.
      return false;
    }

    if (gameObject instanceof Camera) {
      removeFromArray(this.cameras, gameObject);
    }

    const collider = gameObject.getComponent(ColliderComponent);

    if (collider) {
      this.broadPhaseCollisionResolver.untrack(collider);
    }

    gameObject.end();

    return true;
  }

  public has(gameObject: GameObject): boolean {
    return this.gameObjects.hasChild(gameObject.node);
  }

  public async load(): Promise<void> {
    await this.resources.load();
  }

  public fixedUpdate(alpha: number): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.fixedUpdate(alpha));
    this.broadPhaseCollisionResolver.fixedUpdate();
    this.narrowPhaseCollisionResolver.resolve(this.broadPhaseCollisionResolver.pairs);
  }

  public update(): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.update());
    this.broadPhaseCollisionResolver.update();
    this.narrowPhaseCollisionResolver.resolve(this.broadPhaseCollisionResolver.pairs);
  }

  public lateUpdate(): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.lateUpdate());
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // render cameras
    // TODO: camera order is an issue
    this.cameras.forEach(camera => camera.render(ctx, this.gameObjects));
  }

  public destroy(): void {
    super.destroy();
    this.gameObjects.forEachChildren(gameObject => gameObject.destroy());
  }

  public toString(): string {
    return `Scene(${this.name})`;
  }

}
