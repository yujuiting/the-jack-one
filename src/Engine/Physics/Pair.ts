import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Recyclable, Pool } from 'Engine/Utility/Pool';

export class Pair implements Recyclable {

  private static Instances: Pool<Pair> = new Pool(Pair, Infinity, 128);

  public static Get(colliderA: ColliderComponent, colliderB: ColliderComponent): Pair|undefined {
    return (<Pair>this.Instances.get()).reset(colliderA, colliderB);
  }

  public static Put(pair: Pair): void { this.Instances.put(pair); }

  private _canRecycle: boolean;

  public get canRecycle(): boolean { return this._canRecycle; }

  public get bodyA(): ColliderComponent { return this._bodyA; }

  public get bodyB(): ColliderComponent { return this._bodyB; }

  constructor(private _bodyA: ColliderComponent,
              private _bodyB: ColliderComponent) {}

  public reset(bodyA?: ColliderComponent, bodyB?: ColliderComponent): this {
    this._bodyA = bodyA || this._bodyA;
    this._bodyB = bodyB || this._bodyB;
    return this;
  }

  public destroy(): void {
    this._canRecycle = true;
  }

}
