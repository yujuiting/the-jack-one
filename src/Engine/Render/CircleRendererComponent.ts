import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Matrix } from 'Engine/Math/Matrix';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';

export class CircleRendererComponent extends RendererComponent {

  public radius: number = 60;

  public lineWidth: number = 1;

  public strokeColor: Color = Color.Red;

  public center: Vector = new Vector();

  public startAngle: number = 0;

  public endAngle: number = Math.PI * 2;

  public anticlockwise: boolean = false;

  public useLocalCoordinate: boolean = true;

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {

    ctx.save();

    const m = toScreenMatrix.clone();

    if (this.useLocalCoordinate) {
      m.multiply(this.transform.toWorldMatrix);
    }

    /**
     * reverse first to correct y-axis and rotate direction
     */
    m.setScaling(-1, -1);

    ctx.transform(
      m[0][0], m[0][1],
      m[1][0], m[1][1],
      m[0][2], m[1][2]
    );

    ctx.lineWidth = this.lineWidth;

    ctx.strokeStyle = this.strokeColor.toHexString();

    ctx.beginPath();

    const center = this.center.clone();

    ctx.arc(
      center.x,
      center.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      this.anticlockwise
    );

    ctx.closePath();

    ctx.stroke();

    ctx.restore();
  }

}
