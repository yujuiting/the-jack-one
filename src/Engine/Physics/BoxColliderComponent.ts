import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { Bounds } from 'Engine/Physics/Bounds';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { Vector } from 'Engine/Math/Vector';

export class BoxColliderComponent extends ColliderComponent {

  public bounds: Bounds = new Bounds();

  private debugRenderer: LineRendererComponent|null;

  public update(): void {
    if (this.debug) {
      if (this.debugRenderer) {
        this.debugRenderer.points.forEach(point => point.destroy());
        const min = this.bounds.min;
        const max = this.bounds.max;
        this.debugRenderer.points = [
          Vector.Get(min.x, min.y),
          Vector.Get(min.x, max.y),
          Vector.Get(max.x, max.y),
          Vector.Get(max.x, min.y),
          Vector.Get(min.x, min.y)
        ];
      } else {
        this.debugRenderer = this.addComponent(LineRendererComponent);
      }
    } else {
      if (this.debugRenderer) {
        this.removeComponent(this.debugRenderer);
      }
    }
  }

}
