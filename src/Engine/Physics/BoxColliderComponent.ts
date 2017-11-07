import { GameObject } from 'Engine/Base/GameObject';
import { Vector } from 'Engine/Math/Vector';
import { Line } from 'Engine/Math/Line';
import { forwardRef } from 'Engine/Utility/Type';
import { PolygonColliderComponent } from 'Engine/Physics/PolygonColliderComponent';

/**
 * TODO:
 * This is really strange
 * If without access GameObject ever, it will not be loaded.
 * Workaround via forward get temporarily
 * It should be a webpack relevant bug...
 */
forwardRef(() => GameObject);

export class BoxColliderComponent extends PolygonColliderComponent {

  public size: Vector = new Vector();

  constructor(host: GameObject) {
    super(host);
    for (let i = 0; i < 4; i++) {
      this.points.push(new Vector());
      this._cachedPoints.push(new Vector());
      this._cachedAxes.push(new Vector());
      this._cachedSides.push(new Line(new Vector(), new Vector()));
    }
  }

  /**
   * Optimized calculation for rectangle
   * @override
   */
  public calculate(): void {
    const toWorldMatrix = this.host.transform.toWorldMatrix;

    const halfSizeX = this.size.x / 2;
    const halfSizeY = this.size.y / 2;

    this.points[0].setTo(-halfSizeX, -halfSizeY);
    this.points[1].setTo( halfSizeX, -halfSizeY);
    this.points[2].setTo( halfSizeX,  halfSizeY);
    this.points[3].setTo(-halfSizeX,  halfSizeY);

    this._cachedPoints[0].setTo(-halfSizeX, -halfSizeY);
    this._cachedPoints[1].setTo( halfSizeX, -halfSizeY);
    this._cachedPoints[2].setTo( halfSizeX,  halfSizeY);
    this._cachedPoints[3].setTo(-halfSizeX,  halfSizeY);
    this._cachedPoints.forEach(point => toWorldMatrix.multiplyToPoint(point));

    for (let i = 0; i < 4; i++) {
      const p1 = this._cachedPoints[i];
      const p2 = this._cachedPoints[(i + 1) % 4];
      const axis = this._cachedAxes[i];
      const side = this._cachedSides[i];
      axis.copy(p1).subtract(p2);
      side.begin.copy(p1);
      side.end.copy(p2);
    }

    // update bounds
    const x = this._cachedPoints.map(p => p.x);
    const y = this._cachedPoints.map(p => p.y);
    const minX = Math.min(...x);
    const minY = Math.min(...y);
    const maxX = Math.max(...x);
    const maxY = Math.max(...y);

    this.bounds.center.setTo((maxX + minX) / 2, (maxY + minY) / 2);
    this.bounds.extents.setTo((maxX - minX) / 2, (maxY - minY) / 2);
  }

}
