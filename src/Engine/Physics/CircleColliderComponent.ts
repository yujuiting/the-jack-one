import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { CircleBounds } from 'Engine/Physics/CircleBounds';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';

export class CircleColliderComponent extends ColliderComponent {

  public bounds: CircleBounds = new CircleBounds();

  private debugRenderer: CircleRendererComponent;

  public update(): void {
    if (this.debug) {
      if (this.debugRenderer) {
        this.debugRenderer.center.copy(this.bounds.center);
        this.debugRenderer.radius = this.bounds.radius;
      } else {
        this.debugRenderer = this.addComponent(CircleRendererComponent);
      }
    } else {
      if (this.debugRenderer) {
        this.removeComponent(this.debugRenderer);
      }
    }
  }

}
