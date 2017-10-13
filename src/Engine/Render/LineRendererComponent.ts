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

  public update(): void {
    super.update();
    this.calculateBounds();
  }

  public render(ctx: CanvasRenderingContext2D, toScreenMatrix: Matrix): void {

    const count = this._points.length;

    if (count === 0) {
      return;
    }

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

    const firstPoint = this._points[0];

    ctx.lineWidth = this.lineWidth;

    ctx.strokeStyle = this.strokeColor.toHexString();

    ctx.beginPath();

    ctx.moveTo(firstPoint.x, firstPoint.y);

    if (count > 1) {
      for (let i = 1; i < count; i++) {
        const point = this._points[i];
        ctx.lineTo(point.x, point.y);
      }

      if (this.closePath) {
        ctx.lineTo(firstPoint.x, firstPoint.y);
      }
    }

    ctx.stroke();

    ctx.closePath();

    ctx.restore();
  }

  private calculateBounds(): void {
    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;

    this._points.forEach(point => {
      if (point.x < minX) {
        minX = point.x;
      } else if (point.x > maxX) {
        maxX = point.x;
      }

      if (point.y < minY) {
        minY = point.y;
      } else if (point.y > maxY) {
        maxY = point.y;
      }
    });

    this.bounds.reset(minX, minY, maxX, maxY);

    if (this.useLocalCoordinate) {
      this.bounds.center.add(this.transform.position);
    }
  }

}