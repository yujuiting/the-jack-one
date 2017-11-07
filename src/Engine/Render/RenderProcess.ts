import { GameObject } from 'Engine/Core/GameObject';
import { Camera } from 'Engine/Core/Camera';
import { ReadonlyTree } from 'Engine/Utility/Tree';

export const RenderProcess = Symbol('RenderProcess');

export interface RenderProcess {

  useContext(ctx: CanvasRenderingContext2D, width: number, height: number): void;

  render(camera: Camera, gameObjects: ReadonlyTree<GameObject>): void;

}
