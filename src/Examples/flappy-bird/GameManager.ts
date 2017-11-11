import 'rxjs/add/operator/throttleTime';
import { Observable } from 'rxjs/Observable';
import { GameObject } from 'Engine/Core/GameObject';
import { Class } from 'Engine/Decorator/Class';
import { PointerInput } from 'Engine/Input/PointerInput';
import { KeyboardInput } from 'Engine/Input//KeyboardInput';
import { Inject } from 'Engine/Decorator/Inject';
import { Vector } from 'Engine/Math/Vector';
import { Screen } from 'Engine/Display/Screen';
import { Sprite } from 'Engine/Display/Sprite';
import { Random } from 'Engine/Math/Random';
import { AudioPlayerComponent } from 'Engine/Media/AudioPlayerComponent';
import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';

import { bundle, sfx_point, texture_splash } from './resource';
import { Bird } from './Bird';
import { Pipe } from './Pipe';
import { Background } from './Background';
import { Score } from './Score';
import { Splash } from './Splash';
import { SceneManager } from 'Engine/Core/SceneManager';
import { Logger } from 'Engine/Core/Logger';
import { Subscription } from 'rxjs/Subscription';
import { ColliderComponent } from 'Engine/Physics/ColliderComponent';
import { ScoreBoard } from 'Examples/flappy-bird/ScoreBoard';

const kPipeDistance = 300;
const kPipeRandamRange = 200;

enum GameStatus {
  Init,
  Playing,
  Over
}

@Class()
export class GameManager extends GameObject {

  public splash: Splash;

  public score: Score;

  public pipes: Pipe[];

  public bird: Bird;

  public background: Background;

  public scoreBoard: ScoreBoard;

  private sfxScore: AudioPlayerComponent;

  private status = GameStatus.Init;

  @Inject(Screen)
  private screen: Screen;

  @Inject(PointerInput)
  private pointerInput: PointerInput;

  @Inject(KeyboardInput)
  private keyboardInput: KeyboardInput;

  @Inject(Random)
  private random: Random;

  @Inject(SceneManager)
  private sceneManager: SceneManager;

  @Inject(Logger)
  private logger: Logger;

  private subscriptions: Subscription[] = [];

  public start(): void {
    super.start();

    this.sfxScore = this.addComponent(AudioPlayerComponent);
    this.sfxScore.source = sfx_point;

    this.subscriptions.push(this.bird.onCollide$.subscribe((e) => this.onBirdCollide(e)));

    this.subscriptions.push(Observable.merge(
      this.pointerInput.pointerStart$,
      this.keyboardInput.keyDown$.filter(e => e.key === ' ')
    ).throttleTime(100).subscribe(() => this.onTouch()));

    /**
     * Handle infinity pipes
     */
    this.pipes.forEach((pipe, index) =>
      pipe.onBecameInvisible$.subscribe(() => this.onPipeBecameInvisible(pipe, index))
    );

    this.gameReset();
  }

  public destroy(): void {
    super.destroy();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  public update(): void {
    super.update();

    this.pipes.forEach((pipe, index) => {
      /**
       * Check bird has cross this pipe, increase score and mark this pipe if true.
       */
      if (!pipe.scored) {
        if (pipe.transform.position.x < this.bird.transform.position.x) {
          this.increaseScore();
          pipe.scored = true;
          return true;
        }
      }
    });
  }

  public gameStart(): void {
    this.score.setScore(0);
    this.score.activate();
    this.splash.deactivate();
    this.status = GameStatus.Playing;
    this.pipes.forEach(pipe => pipe.startMove());
    this.bird.isFalling = true;
    this.background.isMoving = true;
    this.logger.log('game start');
  }

  public gameOver(): void {
    this.score.deactivate();
    this.status = GameStatus.Over;
    this.logger.log('game over');
    this.scoreBoard.activate();
    this.scoreBoard.setScore(this.score.getScore());
    this.background.isMoving = false;
    this.pipes.forEach(pipe => pipe.stopMove());
  }

  public gameReset(): void {
    this.splash.activate();
    this.scoreBoard.deactivate();
    this.bird.isFalling = false;

    this.bird.transform.position.copy(new Vector(-this.screen.width / 4, 0));

    this.pipes.forEach((pipe, index) => {
      const x = (index + 1) * kPipeDistance;
      const y = this.random.integer(-kPipeRandamRange, kPipeRandamRange) + 50;
      pipe.transform.position.setTo(x, y);
    });

    this.status = GameStatus.Init;
    this.logger.log('game init');
  }

  private increaseScore(): void {
    this.score.increaseScore();
    this.sfxScore.play();
  }

  private onTouch(): void {
    switch (this.status) {
      case GameStatus.Init:
        this.gameStart();
        break;
      case GameStatus.Over:
        this.gameReset();
        break;
      case GameStatus.Playing:
      default:
        this.bird.fly();
        break;
    }
  }

  private onPipeBecameInvisible(pipe: Pipe, index: number): void {
    let prevIndex = index - 1;

    if (prevIndex < 0) {
      prevIndex += this.pipes.length;
    }

    const prevPipe = this.pipes[prevIndex];
    pipe.transform.position.x = prevPipe.transform.position.x + kPipeDistance;
    pipe.transform.position.y = this.random.integer(-kPipeRandamRange, kPipeRandamRange) + 50;
    pipe.scored = false;
  }

  private onBirdCollide(e: ColliderComponent): void {
    if (this.status === GameStatus.Playing) {
      this.bird.die();
      this.gameOver();
    }
  }

}
