import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Scene } from 'Engine/Base/Scene';
import { addToArray,
         removeFromArray,
         includeInArray } from 'Engine/Utility/ArrayUtility';
import { Service } from 'Engine/Decorator/Service';

@Service()
export class SceneManager {

  private readonly scenes: Scene[] = [];

  private _currentScene: Scene;

  private _isLoading: boolean = false;

  private sceneLoaded: Subject<Scene> = new Subject<Scene>();

  private sceneUnloaded: Subject<Scene> = new Subject<Scene>();

  private sceneWillLoad: Subject<Scene> = new Subject<Scene>();

  private sceneWillUnload: Subject<Scene> = new Subject<Scene>();

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
    if (!addToArray(this.scenes, scene)) {
      return false;
    }

    if (!this._currentScene) {
      this._currentScene = scene;
    }

    return true;
  }

  public remove(scene: Scene): boolean {
    if (this._currentScene === scene) {
      throw new Error('Cannot remove current scene.');
    }

    return removeFromArray(this.scenes, scene);
  }

  public switchTo(scene: Scene): Promise<void> {
    if (!includeInArray(this.scenes, scene)) {
      this.add(scene);
    }

    if (this._currentScene === scene) {
      return Promise.resolve();
    }

    this._isLoading = true;

    if (this._currentScene) {
      this.sceneWillUnload.next(this._currentScene);
    }

    this.sceneWillLoad.next(scene);

    return (scene.isLoaded ? Promise.resolve() : scene.load()).then(() => {
      this._currentScene.deactivate();
      this.sceneUnloaded.next(this._currentScene);
      this._currentScene = scene;
      this._isLoading = false;
      this.sceneLoaded.next(this._currentScene);
    });
  }

}
