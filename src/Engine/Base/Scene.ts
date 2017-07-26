import { BaseObject } from 'Engine/Base/BaseObject';
import { GameObject } from 'Engine/Base/GameObject';
import { Tree, ReadonlyTree } from 'Engine/Utility/Tree';
import { Pool } from 'Engine/Utility/Pool';
import { Resource } from 'Engine/Resource/Resource';
import { Bundle } from 'Engine/Resource/Bundle';
import { Camera, MainCamera } from 'Engine/Base/Camera';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';
import { Inject } from 'Engine/Utility/Decorator/Inject';

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

  public get isLoaded(): boolean { return this.resources.isLoaded; }

  constructor(@Inject(MainCamera) mainCamera: Camera) {
    super();
    this.add(mainCamera);
  }

  public add(gameObject: GameObject): boolean {
    if (!this.gameObjects.add(gameObject.node)) {
      return false;
    }

    if (gameObject instanceof Camera) {
      addToArray(this.cameras, gameObject);
      return true;
    }

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

    return true;
  }

  public load(): Promise<void> {
    return this.resources.load();
  }

  public fixedUpdate(alpha: number): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.fixedUpdate(alpha));
  }

  public update(): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.update());
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
