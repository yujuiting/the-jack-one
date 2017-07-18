import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Matrix2D } from 'Engine/Math/Matrix2D';
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

  public render(ctx: CanvasRenderingContext2D, toViewportMatrix: Matrix2D): void {
    ctx.save();

    ctx.lineWidth = this.lineWidth;

    ctx.strokeStyle = this.strokeColor.toHexString();

    ctx.beginPath();

    const center = this.center.clone();

    center.add(this.transform.position);

    toViewportMatrix.multiplyToPoint(center);

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
