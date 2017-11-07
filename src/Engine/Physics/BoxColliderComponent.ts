import { GameObject } from 'Engine/Core/GameObject';
import { Vector } from 'Engine/Math/Vector';
import { Line } from 'Engine/Math/Line';
import { forwardRef } from 'Engine/Utility/Type';
import { PolygonColliderComponent } from 'Engine/Physics/PolygonColliderComponent';
import { Inject } from 'Engine/Decorator/Inject';
import { CollisionJumpTable } from 'Engine/Physics/CollisionJumpTable';

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

  constructor(host: GameObject,
              @Inject(CollisionJumpTable) collisionJumpTable: CollisionJumpTable) {
    super(host, collisionJumpTable);
    for (let i = 0; i < 4; i++) {
      this.points.push(new Vector());
      this._calculatedPoints.push(new Vector());
      this._calculatedAxes.push(new Vector());
      this._calculatedSides.push(new Line(new Vector(), new Vector()));
    }
  }

  /**
   * Optimized calculation for rectangle
   * @override
   */
  public calculate(): void {
    const toWorldMatrix = this.host.transform.toWorldMatrix;

    const halfSizeX = this.size.x * 0.5;
    const halfSizeY = this.size.y * 0.5;

    this.points[0].setTo(-halfSizeX, -halfSizeY);
    this.points[1].setTo( halfSizeX, -halfSizeY);
    this.points[2].setTo( halfSizeX,  halfSizeY);
    this.points[3].setTo(-halfSizeX,  halfSizeY);

    this._calculatedPoints[0].setTo(-halfSizeX, -halfSizeY);
    this._calculatedPoints[1].setTo( halfSizeX, -halfSizeY);
    this._calculatedPoints[2].setTo( halfSizeX,  halfSizeY);
    this._calculatedPoints[3].setTo(-halfSizeX,  halfSizeY);
    this._calculatedPoints.forEach(point => toWorldMatrix.multiplyToPoint(point));

    for (let i = 0; i < 4; i++) {
      const p1 = this._calculatedPoints[i];
      const p2 = this._calculatedPoints[(i + 1) % 4];
      const axis = this._calculatedAxes[i];
      const side = this._calculatedSides[i];
      axis.copy(p1).subtract(p2);
      side.begin.copy(p1);
      side.end.copy(p2);
    }

    // update bounds
    const x = this._calculatedPoints.map(p => p.x);
    const y = this._calculatedPoints.map(p => p.y);
    const minX = Math.min(...x);
    const minY = Math.min(...y);
    const maxX = Math.max(...x);
    const maxY = Math.max(...y);

    this.bounds.center.setTo((maxX + minX) / 2, (maxY + minY) / 2);
    this.bounds.extents.setTo((maxX - minX) / 2, (maxY - minY) / 2);
  }

}
