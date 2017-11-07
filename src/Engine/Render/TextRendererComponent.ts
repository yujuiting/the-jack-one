import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Color } from 'Engine/Display/Color';
import { Class } from 'Engine/Decorator/Class';

@Class()
export class TextRendererComponent extends RendererComponent {

  public text: string = '';

  public maxWidth: number = Number.MAX_VALUE;

  public strokeColor: Color|undefined;

  public fillColor: Color|undefined = Color.White;

  public fontSize: number = 16;

  public fontFamily: string = 'Arial';

  public fontWeight: number = 100;

  public fontStyle: 'normal'|'italic'|'oblique' = 'normal';

  public fontVariant: 'normal'|'small-caps' = 'normal';

  private actualWidth: number = 0;

  public update(): void {
    super.update();

    this.ctx.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;

    this.actualWidth = this.ctx.measureText(this.text).width;

    this.canvas.width = this.actualWidth;

    // TODO: Ensure descender line of font can display
    this.canvas.height = this.fontSize;
  }

  public render(): void {
    const ctx = this.ctx;

    if (this.strokeColor) {
      ctx.strokeStyle = this.strokeColor.toHexString();
      ctx.strokeText(this.text, 0, this.fontSize, this.maxWidth);
    }

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor.toHexString();
      ctx.fillText(this.text, 0, this.fontSize, this.maxWidth);
    }
  }

}
