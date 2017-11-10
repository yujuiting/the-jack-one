import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Scene } from 'Engine/Core/Scene';
import { addToArray,
         removeFromArray,
         includeInArray } from 'Engine/Utility/ArrayUtility';
import { Service } from 'Engine/Decorator/Service';
import { SceneManager } from 'Engine/Core/SceneManager';

@Service(SceneManager)
export class SceneManagerImplement implements SceneManager {

  private readonly scenes = new Set();

  private _currentScene: Scene;

  private _isLoading = false;

  private sceneLoaded = new Subject<Scene>();

  private sceneUnloaded = new Subject<Scene>();

  private sceneWillLoad = new Subject<Scene>();

  private sceneWillUnload = new Subject<Scene>();

  public get isLoading(): boolean { return this._isLoading; }

  /**
   * Scene has been loaded and switched to it.
   */
  public get sceneLoaded$(): Observable<Scene> { return this.sceneLoaded.asObservable(); }

  /**
   * Scene has been switched out.
   */
  public get sceneUnloaded$(): Observable<Scene> { return this.sceneUnloaded.asObservable(); }

  /**
   * Scene will be switched to.
   */
  public get sceneWillLoad$(): Observable<Scene> { return this.sceneWillLoad.asObservable(); }

  /**
   * Scene will be switched out.
   */
  public get sceneWillUnload$(): Observable<Scene> { return this.sceneWillUnload.asObservable(); }

  public get currentScene(): Scene { return this._currentScene; }

  public add(scene: Scene): boolean {
    if (!this.scenes.has(scene)) {
      return false;
    }

    this.scenes.add(scene);

    return true;
  }

  public remove(scene: Scene): boolean {
    if (this._currentScene === scene) {
      throw new Error('Cannot remove current scene.');
    }

    return this.scenes.delete(scene);
  }

  public async switchTo(scene: Scene): Promise<void> {
    if (this._isLoading) {
      throw new Error('Cannot switch scene while loading');
    }

    if (!this.scenes.has(scene)) {
      this.add(scene);
    }

    if (this._currentScene === scene) {
      return;
    }

    if (!scene.isLoaded) {
      this._isLoading = true;
      this.sceneWillLoad.next(scene);
      await scene.load();
    }

    if (this._currentScene) {
      this.sceneWillUnload.next(this._currentScene);
      this._currentScene.deactivate();
      this.sceneUnloaded.next(this._currentScene);
    }

    this._isLoading = false;
    this._currentScene = scene;
    scene.start();
    this.sceneLoaded.next(scene);
  }

}
