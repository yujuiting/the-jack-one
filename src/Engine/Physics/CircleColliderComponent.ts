import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { CircleRendererComponent } from 'Engine/Render/CircleRendererComponent';

export class CircleColliderComponent extends ColliderComponent {

  public radius: number = 0;

  private debugRenderer: CircleRendererComponent;

  public update(): void {
    if (this.debug) {
      if (!this.debugRenderer) {
        this.debugRenderer = this.addComponent(CircleRendererComponent);
      }
      this.debugRenderer.center.copy(this.bounds.center);
      this.debugRenderer.radius = this.radius;
    } else {
      if (this.debugRenderer) {
        this.removeComponent(this.debugRenderer);
      }
    }
  }

}
