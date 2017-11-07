import { Observable } from 'rxjs/Observable';
import { Scene } from 'Engine/Core/Scene';

export const SceneManager = Symbol('SceneManager');

export interface SceneManager {

  readonly isLoading: boolean;

  /**
   * Scene has been loaded and switched to it.
   */
  readonly  sceneLoaded$: Observable<Scene>;

  /**
   * Scene has been switched out.
   */
  readonly sceneUnloaded$: Observable<Scene>;

  /**
   * Scene will be switched to.
   */
  readonly sceneWillLoad$: Observable<Scene>;

  /**
   * Scene will be switched out.
   */
  readonly sceneWillUnload$: Observable<Scene>;

  readonly currentScene: Scene;

  add(scene: Scene): boolean;

  remove(scene: Scene): boolean;

  switchTo(scene: Scene): Promise<void>;

}
