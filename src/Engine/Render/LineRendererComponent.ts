import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Matrix } from 'Engine/Math/Matrix';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';
import { addToArray, removeFromArray } from 'Engine/Utility/ArrayUtility';

export class LineRendererComponent extends RendererComponent {

  public lineWidth: number = 1;

  public strokeColor: Color = Color.Red;

  public closePath: boolean = false;

  public useLocalCoordinate: boolean = true;

  private _points: Vector[] = [];

  public points(): ReadonlyArray<Vector> { return this._points; }

  public addPoint(...points: Vector[]): void {
    points.forEach(point => addToArray(this._points, point));
  }

  public removePoint(...points: Vector[]): void {
    points.forEach(point => removeFromArray(this._points, point));
  }

  public clearPoints(): void {
    this._points.forEach(point => point.destroy());
    this._points.splice(0, this._points.length);
  }

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {
    const points = this._points.map(point => point.clone());

    if (this.useLocalCoordinate) {
      const toWorldTransform = this.transform.toWorldMatrix;
      points.forEach(point => toWorldTransform.multiplyToPoint(point));
    }

    points.map(point => toScreenMatrix.multiplyToPoint(point));

    const firstPoint = points.shift();

    if (!firstPoint) {
      return;
    }

    ctx.save();

    ctx.lineWidth = this.lineWidth;

    ctx.strokeStyle = this.strokeColor.toHexString();

    ctx.beginPath();

    ctx.moveTo(firstPoint.x, firstPoint.y);

    points.forEach((point, index) => {
      ctx.lineTo(point.x, point.y);
    });

    if (this.closePath) {
      ctx.lineTo(firstPoint.x, firstPoint.y);
    }

    ctx.stroke();

    ctx.closePath();

    ctx.restore();
  }

}
