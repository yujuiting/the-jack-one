import { GameObject } from 'Engine/Core/GameObject';
import { TextRendererComponent } from 'Engine/Render/TextRendererComponent';
import { font } from './resource';
import { Color } from 'Engine/Display/Color';

export class Score extends GameObject {

  private renderer: TextRendererComponent;

  private value = 0;

  public reset(): void {
    super.reset();
    this.renderer = this.addComponent(TextRendererComponent);
    this.renderer.fontFamily = font.fontFamily;
    this.renderer.fontSize = 64;
    this.renderer.strokeColor = Color.Black;
    this.renderer.lineWidth = 2;
  }

  public setScore(value: number): void {
    this.value = value;
    this.renderer.text = `${value}`;
  }

  public getScore(): number {
    return this.value;
  }

  public increaseScore(): void {
    this.setScore(++this.value);
  }

}
