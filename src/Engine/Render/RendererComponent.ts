import { Component } from 'Engine/Base/Component';
import { GameObject } from 'Engine/Base/GameObject';

/**
 * Base renderer
 */
export abstract class RendererComponent extends Component {

  public abstract render(ctx: CanvasRenderingContext2D): void;

}
