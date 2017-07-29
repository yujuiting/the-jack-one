import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
import { Vector } from 'Engine/Math/Vector';

export class BoxColliderComponent extends ColliderComponent {

  private debugRenderer: LineRendererComponent|null;

  public update(): void {
    if (this.debug) {
      if (!this.debugRenderer) {
        this.debugRenderer = this.addComponent(LineRendererComponent);
      }
      this.debugRenderer.clearPoints();
      const min = this.bounds.min;
      const max = this.bounds.max;
      this.debugRenderer.addPoint(Vector.Get(min.x, min.y));
      this.debugRenderer.addPoint(Vector.Get(min.x, max.y));
      this.debugRenderer.addPoint(Vector.Get(max.x, max.y));
      this.debugRenderer.addPoint(Vector.Get(max.x, min.y));
      this.debugRenderer.addPoint(Vector.Get(min.x, min.y));
    } else {
      if (this.debugRenderer) {
        this.removeComponent(this.debugRenderer);
      }
    }
  }

}
