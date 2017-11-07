import { RendererComponent } from 'Engine/Render/RendererComponent';
import { Color } from 'Engine/Display/Color';

export class CircleRendererComponent extends RendererComponent {

  public radius: number = 60;

  public lineWidth: number = 1;

  public strokeColor: Color|undefined = Color.Red;

  public fillColor: Color|undefined;

  public startAngle: number = 0;

  public endAngle: number = Math.PI * 2;

  public anticlockwise: boolean = false;

  public useLocalCoordinate: boolean = true;

  public update(): void {
    super.update();

    const halfOfLineWidth = Math.floor(this.lineWidth * 0.5);
    this.canvas.width = this.radius + halfOfLineWidth;
    this.canvas.height = this.radius + halfOfLineWidth;
  }

  public render(): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();

    if (!this.useLocalCoordinate) {
      const m = this.transform.toLocalMatrix;
      ctx.transform(
        m[0][0], m[0][1],
        m[1][0], m[1][1],
        m[0][2], m[1][2]
      );
    }

    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();

    ctx.arc(
      this.bounds.extents.x,
      this.bounds.extents.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      this.anticlockwise
    );

    ctx.closePath();

    if (this.strokeColor) {
      ctx.strokeStyle = this.strokeColor.toHexString();
      ctx.stroke();
    }

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor.toHexString();
      ctx.fill();
    }

    ctx.restore();
  }

}
