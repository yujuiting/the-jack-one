import { Class } from 'Engine/Decorator/Class';
import { GameObject } from 'Engine/Core/GameObject';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
import { Sprite } from 'Engine/Display/Sprite';

import { texture_scoreboard,
         texture_medal_bronze,
         texture_medal_silver,
         texture_medal_gold,
         texture_medal_platinum,
         font } from './resource';
import { instantiate } from 'Engine/runtime';
import { TextRendererComponent } from 'Engine/Render/TextRendererComponent';
import { Color } from 'Engine/Display/Color';

@Class()
export class ScoreBoard extends GameObject {

  private renderer: SpriteRendererComponent;

  private medal: Medal;

  private currentScore: Score;

  private bestScore: Score;

  public start(): void {
    super.start();
    this.renderer = this.addComponent(SpriteRendererComponent);
    this.renderer.sprite = new Sprite(texture_scoreboard);

    this.medal = instantiate(Medal);
    this.medal.transform.position.setTo(-62, 6);
    this.addChild(this.medal);

    this.currentScore = instantiate(Score);
    this.currentScore.transform.position.setTo(80, 28);
    this.addChild(this.currentScore);

    this.bestScore = instantiate(Score);
    this.bestScore.transform.position.setTo(80, -12);
    this.addChild(this.bestScore);
  }

  public setScore(score: number) {
    this.currentScore.setScore(score);
    this.bestScore.setScore(0);
    if (score >= 40) {
      this.medal.setType(MedalType.Platinum);
    } else if (score >= 30) {
      this.medal.setType(MedalType.Gold);
    } else if (score >= 20) {
      this.medal.setType(MedalType.Silver);
    } else if (score >= 10) {
      this.medal.setType(MedalType.Bronze);
    } else {
      this.medal.setType(MedalType.None);
    }
  }

}

enum MedalType {
  None,
  Bronze,  // > 10
  Silver,  // > 20
  Gold,    // > 30
  Platinum // > 40
}

@Class()
class Medal extends GameObject {

  private renderer: SpriteRendererComponent;

  public start(): void {
    super.start();
    this.renderer = this.addComponent(SpriteRendererComponent);
  }

  public setType(type: MedalType): void {
    switch (type) {
      case MedalType.Bronze:
        this.renderer.sprite = new Sprite(texture_medal_bronze);
        break;
      case MedalType.Silver:
        this.renderer.sprite = new Sprite(texture_medal_silver);
        break;
      case MedalType.Gold:
        this.renderer.sprite = new Sprite(texture_medal_gold);
        break;
      case MedalType.Platinum:
        this.renderer.sprite = new Sprite(texture_medal_platinum);
        break;
      case MedalType.None:
      default:
        this.renderer.sprite = undefined;
        break;
    }
  }

}

class Score extends GameObject {

  private renderer: TextRendererComponent;

  public start(): void {
    super.start();
    this.renderer = this.addComponent(TextRendererComponent);
    this.renderer.fontFamily = font.fontFamily;
    this.renderer.fontSize = 24;
    this.renderer.strokeColor = Color.Black;
    this.renderer.lineWidth = 2;
  }

  public setScore(score: number): void {
    this.renderer.text = `${score}`;
  }

}
