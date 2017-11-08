import { BaseObject } from 'Engine/Core/BaseObject';
import { GameObject } from 'Engine/Core/GameObject';
import { Tree } from 'Engine/Utility/Tree';
import { Bundle } from 'Engine/Resource/Bundle';
import { Camera, MainCamera } from 'Engine/Core/Camera';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';
import { Inject } from 'Engine/Decorator/Inject';
import { Class } from 'Engine/Decorator/Class';
import { BroadPhaseCollisionResolver } from 'Engine/Physics/BroadPhaseCollisionResolver';
import { NarrowPhaseCollisionResolver } from 'Engine/Physics/NarrowPhaseCollisionResolver';
import { Vector } from 'Engine/Math/Vector';
import { GameObjectInitializer } from 'Engine/Core/GameObjectInitializer';
import { RenderProcess } from 'Engine/Render/RenderProcess';
import { ifdef, DEBUG_PHYSICS, DEBUG } from 'Engine/runtime';
import { Logger } from 'Engine/Core/Logger';
import { Screen } from 'Engine/Display/Screen';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Subscription } from 'rxjs/Subscription';
import { Time } from 'Engine/Time/Time';
import { Color } from 'Engine/Display/Color';

/**
 * Scene manage game objects and resources.
 */
@Class()
export class Scene extends BaseObject {

  public readonly resources: Bundle = new Bundle();

  /**
   * Game objects store as a tree.
   * If a parent was deactivated, all children of it will be deactivated.
   */
  private readonly gameObjects: Tree<GameObject> = new Tree<GameObject>(<any>null);

  private cameras: Camera[] = [];

  private rightTop = new Vector();

  private resizeSubscription: Subscription;

  public get isLoaded(): boolean { return this.resources.isLoaded; }

  constructor(@Inject(BroadPhaseCollisionResolver) private broadPhaseCollisionResolver: BroadPhaseCollisionResolver,
              @Inject(NarrowPhaseCollisionResolver) private narrowPhaseCollisionResolver: NarrowPhaseCollisionResolver,
              @Inject(GameObjectInitializer) private gameObjectInitializer: GameObjectInitializer,
              @Inject(RenderProcess) private renderProcess: RenderProcess,
              @Inject(MainCamera) public mainCamera: Camera,
              @Inject(Logger) private logger: Logger,
              @Inject(Screen) private screen: Screen,
              @Inject(BrowserDelegate) private browser: BrowserDelegate,
              @Inject(Time) private time: Time) {
    super();
    this.add(this.mainCamera);
    this.resizeSubscription = browser.resize$.subscribe(() => this.onResize());
    this.rightTop.setTo(this.screen.width, 0);
  }

  public add(gameObject: GameObject, at?: Vector): boolean {
    if (!this.gameObjects.add(gameObject.node)) {
      return false;
    }

    if (!gameObject.hasStarted) {
      gameObject.node.hide();
    }

    if (gameObject instanceof Camera) {
      addToArray(this.cameras, gameObject);
    }

    if (at) {
      gameObject.transform.position.copy(at);
    }

    return true;
  }

  public remove(gameObject: GameObject): boolean {
    // ensure parent has visiblity to this node.
    gameObject.node.show();

    if (!this.gameObjects.remove(gameObject.node)) {
      // It may return false if this game object's parent is not scene root.
      return false;
    }

    if (gameObject instanceof Camera) {
      removeFromArray(this.cameras, gameObject);
    }

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
    ifdef(DEBUG, () => this.logger.update());
  }

  public lateUpdate(): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.lateUpdate());
  }

  public preRender(): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.preRender());
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // TODO: camera order is an issue
    this.renderProcess.useContext(ctx, width, height);
    this.cameras.forEach(camera => this.renderProcess.render(camera, this.gameObjects));
    ifdef(DEBUG_PHYSICS, () => this.cameras.forEach(camera => this.broadPhaseCollisionResolver.debugRender(ctx, camera)));
    ifdef(DEBUG, () => {
      this.logger.render(ctx);
      this.debugRender(ctx);
    });
  }

  public postRender(): void {
    this.gameObjects.forEachChildren(gameObject => gameObject.postRender());
    /**
     * Resove all game object initialization at final step to ensure their cycle start at update call.
     */
    this.gameObjectInitializer.resolve();
  }

  public reset(): void {
    this.reset();
    this.resizeSubscription = this.browser.resize$.subscribe(() => this.onResize());
  }

  public destroy(): void {
    super.destroy();
    this.gameObjects.forEachChildren(gameObject => gameObject.destroy());
    this.resizeSubscription.unsubscribe();
  }

  public toString(): string {
    return `Scene(${this.name})`;
  }

  private debugRender(ctx: CanvasRenderingContext2D): void {
    const deltaTime = ((this.time.deltaTime * 100) | 0) * 0.01;
    const fps = ((1000 / deltaTime * 100) | 0) * 0.01;

    ctx.save();
    ctx.fillStyle = Color.White.toHexString();

    const deltaTimeText = `deltaTime: ${deltaTime}`;
    const deltaTimeWidth = ctx.measureText(deltaTimeText).width;
    ctx.fillText(deltaTimeText, this.rightTop.x - deltaTimeWidth, this.rightTop.y + 12);

    const fpsText = `fps: ${fps}`;
    const fpsWidth = ctx.measureText(fpsText).width;
    ctx.fillText(fpsText, this.rightTop.x - fpsWidth, this.rightTop.y + 30);
  }

  private onResize(): void {
    this.rightTop.setTo(this.screen.width, 0);
  }

}
