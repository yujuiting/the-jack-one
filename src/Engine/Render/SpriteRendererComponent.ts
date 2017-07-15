import { RendererComponent } from 'Engine/Render/RendererComponent';
import { TransformComponent } from 'Engine/Display/TransformComponent';
import { Sprite } from 'Engine/Display/Sprite';
import { UniqueComponent } from 'Engine/Utility/Decorator/uniqueComponent';
import { RequireComponent } from 'Engine/Utility/Decorator/RequireComponent';

@UniqueComponent()
@RequireComponent([TransformComponent])
export class SpriteRendererComponent extends RendererComponent {

  public sprite: Sprite;

  public render(ctx: CanvasRenderingContext2D): void {
    const transform = <TransformComponent>this.getComponent(TransformComponent);
    ctx.drawImage(
      this.sprite.texture.source,
      this.sprite.offsetX,
      this.sprite.offsetY,
      this.sprite.width,
      this.sprite.height,
      transform.position.x,
      transform.position.y,
      transform.width,
      transform.height
    );
  }

}
