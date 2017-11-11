import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Color } from 'Engine/Display/Color';
import { Class } from 'Engine/Decorator/Class';

@Class()
export class TextRendererComponent extends RendererComponent {

  public text = '';

  public maxWidth = Number.MAX_VALUE;

  public strokeColor: Color|undefined;

  public fillColor: Color|undefined = Color.White;

  public fontSize = 16;

  public lineWidth = 1;

  public fontFamily = 'Arial';

  public fontWeight = 100;

  public fontStyle: 'normal'|'italic'|'oblique'|'' = '';

  public fontVariant: 'normal'|'small-caps'|'' = '';

  private actualWidth = 0;

  public update(): void {
    super.update();

    // Set font for measure text width.
    this.ctx.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`.trim();

    this.actualWidth = this.ctx.measureText(this.text).width;

    this.canvas.width = this.actualWidth;

    // TODO: Ensure descender line of font can display
    this.canvas.height = this.fontSize;
  }

  public render(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set font again, because after resize canvas, it will be restore.
    this.ctx.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor.toHexString();
      ctx.fillText(this.text, 0, this.fontSize, this.maxWidth);
    }

    if (this.strokeColor) {
      ctx.strokeStyle = this.strokeColor.toHexString();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeText(this.text, 0, this.fontSize, this.maxWidth);
    }
  }

}
