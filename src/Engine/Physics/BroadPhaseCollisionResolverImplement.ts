import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';
import { Pair } from 'Engine/Physics/Pair';
import { Service } from 'Engine/Decorator/Service';
import { BroadPhaseCollisionResolver } from 'Engine/Physics/BroadPhaseCollisionResolver';
import { Camera } from 'Engine/Core/Camera';
import { Vector } from 'Engine/Math/Vector';
import { Color } from 'Engine/Display/Color';
import { Ray } from 'Engine/Math/Ray';

@Service(BroadPhaseCollisionResolver)
export class BroadPhaseCollisionResolverImplement implements BroadPhaseCollisionResolver {

  private readonly awakeColliders: ColliderComponent[] = [];

  private readonly sleepingColliders: ColliderComponent[] = [];

  private readonly _pairs: Pair[] = [];

  get pairs(): ReadonlyArray<Pair> { return this._pairs; }

  public track(collider: ColliderComponent): boolean {
    if (collider.rigidbody && !collider.rigidbody.isSleeping) {
      return addToArray(this.awakeColliders, collider);
    } else {
      return addToArray(this.sleepingColliders, collider);
    }
  }

  public untrack(collider: ColliderComponent): boolean {
    if (removeFromArray(this.awakeColliders, collider)) {
      return true;
    }

    return removeFromArray(this.sleepingColliders, collider);
  }

  public fixedUpdate(): void {
    this._pairs.forEach(pair => Pair.Put(pair));
    this._pairs.splice(0, this._pairs.length);

    const awakeLength = this.awakeColliders.length;
    const sleepingLength = this.sleepingColliders.length;
    let colliderA: ColliderComponent;
    let colliderB: ColliderComponent;

    for (let a = 0; a < awakeLength; a++) {
      colliderA = this.awakeColliders[a];

      if (!colliderA.host.isActive) {
        continue;
      }

      for (let b = a + 1; b < awakeLength; b++) {
        colliderB = this.awakeColliders[b];

        if (!colliderB.host.isActive) {
          continue;
        }

        if ((colliderA.layer & colliderB.layer) === 0) {
          continue;
        }

        if (colliderA.bounds.intersects(colliderB.bounds)) {
          const pair = Pair.Get(colliderA, colliderB);
          if (pair) {
            this._pairs.push(pair);
          }
        }
      }

      for (let b = 0; b < sleepingLength; b++) {
        colliderB = this.sleepingColliders[b];

        if (!colliderB.host.isActive) {
          continue;
        }

        if ((colliderA.layer & colliderB.layer) === 0) {
          continue;
        }

        if (colliderA.bounds.intersects(colliderB.bounds)) {
          const pair = Pair.Get(colliderA, colliderB);
          if (pair) {
            this._pairs.push(pair);
          }
        }
      }
    }
  }

  public update(): void {
    const goToSleep = this.awakeColliders.filter(collider => collider.rigidbody && collider.rigidbody.isSleeping);
    goToSleep.forEach(collider => {
      removeFromArray(this.awakeColliders, collider);
      addToArray(this.sleepingColliders, collider);
    });

    const goToAwake = this.sleepingColliders.filter(collider => collider.rigidbody && !collider.rigidbody.isSleeping);
    goToAwake.forEach(collider => {
      removeFromArray(this.sleepingColliders, collider);
      addToArray(this.awakeColliders, collider);
    });

    this._pairs.forEach(pair => Pair.Put(pair));
    this._pairs.splice(0, this._pairs.length);
  }

  public debugRender(ctx: CanvasRenderingContext2D, camera: Camera): void {
    this.awakeColliders.forEach(collider => {
      if (collider.bounds.intersects(camera.bounds)) {
        this.debugRenderCollider(ctx, camera, collider, Color.Red);
      }
    });

    this.sleepingColliders.forEach(collider => {
      if (collider.bounds.intersects(camera.bounds)) {
        this.debugRenderCollider(ctx, camera, collider, Color.Cyan);
      }
    });
  }

  private debugRenderCollider(ctx: CanvasRenderingContext2D, camera: Camera, collider: ColliderComponent, color: Color): void {
    const rigidbody = collider.rigidbody;
    const bounds = collider.bounds;
    const points = [
      Vector.Get().copy(bounds.center).add( bounds.extents.x,  bounds.extents.y),
      Vector.Get().copy(bounds.center).add( bounds.extents.x, -bounds.extents.y),
      Vector.Get().copy(bounds.center).add(-bounds.extents.x, -bounds.extents.y),
      Vector.Get().copy(bounds.center).add(-bounds.extents.x,  bounds.extents.y)
    ];
    points.forEach(p => camera.toScreenMatrix.multiplyToPoint(p));

    ctx.save();

    ctx.strokeStyle = color.toHexString();
    ctx.beginPath();
    ctx.moveTo(points[3].x, points[3].y);
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.stroke();

    points.forEach(p => Vector.Put(p));
    points.splice(0, 4);

    const rotation = collider.transform.rotation;
    const direction = Vector.Get(1, 0).rotate(rotation);
    const ray = new Ray(bounds.center, direction);
    const point = collider.rayCast(ray) || direction;
    const center = Vector.Get().copy(bounds.center);
    camera.toScreenMatrix.multiplyToPoint(point);
    camera.toScreenMatrix.multiplyToPoint(center);

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.stroke();

    Vector.Put(point);
    Vector.Put(center);

    ctx.restore();
  }

}
