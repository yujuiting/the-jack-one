import { GameObject } from 'Engine/Base/GameObject';
import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Matrix } from 'Engine/Math/Matrix';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Class } from 'Engine/Decorator/Class';

@Class()
export class TextRendererComponent extends RendererComponent {

  public text: string = '';

  public maxWidth: number = Number.MAX_VALUE;

  public strokeColor: Color|undefined;

  public fillColor: Color|undefined = Color.White;

  public fontSize: number = 16;

  public fontFamily: string = 'Arial';

  public fontWeight: number = 100;

  public fontStyle: 'normal'|'italic'|'oblique' = 'normal';

  public fontVariant: 'normal'|'small-caps' = 'normal';

  private actualWidth: number = 0;

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  constructor(host: GameObject,
              browserDelegate: BrowserDelegate) {
    super(host);
    this.canvas = browserDelegate.createCanvas();
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
  }

  public update(): void {
    super.update();
    this.calculateBounds();
  }

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {
    ctx.save();

    const m = toScreenMatrix.clone().multiply(this.transform.toWorldMatrix);

    /**
     * reverse first to correct y-axis and rotate direction
     */
    m.setScaling(1, -1);

    ctx.transform(
      m[0][0], m[0][1],
      m[1][0], m[1][1],
      m[0][2], m[1][2]
    );

    this.actualWidth = ctx.measureText(this.text).width;

    ctx.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;

    if (this.strokeColor) {
      ctx.strokeStyle = this.strokeColor.toHexString();
      ctx.strokeText(
        this.text,
        -this.actualWidth * 0.5,
        this.fontSize * 0.5,
        this.maxWidth
      );
    }

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor.toHexString();
      ctx.fillText(
        this.text,
        -this.actualWidth * 0.5,
        this.fontSize * 0.5,
        this.maxWidth
      );
    }

    ctx.restore();
  }

  private calculateBounds(): void {
    const halfWidth = this.actualWidth * 0.5;
    const halfHeight = this.fontSize * 0.5;
    this.bounds.extents.setTo(halfWidth, halfHeight);
    this.bounds.center
      .copy(this.transform.position);
  }

}
