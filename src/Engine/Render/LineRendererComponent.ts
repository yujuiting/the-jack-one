import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Matrix2D } from 'Engine/Math/Matrix2D';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';
import { addToArray, removeFromArray } from 'Engine/Utility/ArrayUtility';

export class LineRendererComponent extends RendererComponent {

  public lineWidth: number = 1;

  public strokeColor: Color = Color.Red;

  private _points: Vector[] = [];

  public points(): ReadonlyArray<Vector> { return this._points; }

  public addPoint(point: Vector, ...points: Vector[]): void {
    addToArray(this._points, point);
    points.forEach(p => addToArray(this._points, p));
  }

  public removePoint(point: Vector, ...points: Vector[]): void {
    removeFromArray(this._points, point);
    points.forEach(p => removeFromArray(this._points, p));
  }

  public clearPoints(): void {
    this._points.forEach(point => point.destroy());
    this._points.splice(0, this._points.length);
  }

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix2D): void {
    const points = this._points.map(point => point.clone());

    points.forEach(point => point.add(this.transform.position));

    if (points.length < 2) {
      return;
    }

    points.map(point => toScreenMatrix.multiplyToPoint(point));

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
