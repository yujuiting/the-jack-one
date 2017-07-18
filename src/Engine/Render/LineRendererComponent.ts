import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Matrix2D } from 'Engine/Math/Matrix2D';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';

export class LineRendererComponent extends RendererComponent {

  public lineWidth: number = 1;

  public strokeColor: Color = Color.Red;

  public points: Vector[] = [];

  public render(ctx: CanvasRenderingContext2D, toViewportMatrix: Matrix2D): void {
    const points = this.points.map(point => point.clone());

    points.forEach(point => point.add(this.transform.position));

    if (points.length < 2) {
      return;
    }

    points.map(point => toViewportMatrix.multiplyToPoint(point));

    ctx.save();

    ctx.lineWidth = this.lineWidth;

    ctx.strokeStyle = this.strokeColor.toHexString();

    ctx.beginPath();

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();

    ctx.closePath();

    ctx.restore();
  }

}
