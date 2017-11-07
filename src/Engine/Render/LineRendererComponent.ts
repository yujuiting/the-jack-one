import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';
import { addToArray, removeFromArray } from 'Engine/Utility/ArrayUtility';

export class LineRendererComponent extends RendererComponent {

  public lineWidth: number = 1;

  public strokeColor: Color|undefined = Color.Red;

  public fillColor: Color|undefined;

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

  public update(): void {
    super.update();

    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;

    this._points.forEach(point => {
      if (point.x < minX) {
        minX = point.x;
      }

      if (point.x > maxX) {
        maxX = point.x;
      }

      if (point.y < minY) {
        minY = point.y;
      }

      if (point.y > maxY) {
        maxY = point.y;
      }
    });

    this.canvas.width = maxX - minX;
    this.canvas.height = maxY - minX;
  }

  public render(): void {

    const count = this._points.length;

    if (count === 0) {
      return;
    }

    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();

    if (!this.useLocalCoordinate) {
      const m = this.transform.toLocalMatrix;
      ctx.transform(
        m[0][0], m[0][1],
        m[1][0], m[1][1],
        m[0][2], m[1][2]
      );
    }

    const firstPoint = this._points[0];

    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();

    ctx.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 1; i < count; i++) {
      const point = this._points[i];
      ctx.lineTo(point.x, point.y);
    }

    if (this.closePath) {
      ctx.lineTo(firstPoint.x, firstPoint.y);
    }

    ctx.closePath();

    if (this.strokeColor) {
      ctx.strokeStyle = this.strokeColor.toHexString();
      ctx.stroke();
    }

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor.toHexString();
      ctx.fill();
    }

    ctx.restore();
  }

}
