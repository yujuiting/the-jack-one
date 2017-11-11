import { Class } from 'Engine/Decorator/Class';
import { Inject } from 'Engine/Decorator/Inject';
import { SceneManager } from 'Engine/Core/SceneManager';
import { instantiate } from 'Engine/runtime';
import { Scene } from 'Engine/Core/Scene';
import { Vector } from 'Engine/Math/Vector';

import { GameManager } from './GameManager';
import { Background } from './Background';
import { Splash } from './Splash';
import { Score } from './Score';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { BuiltInLayer } from 'Engine/Utility/Type';
import { ScoreBoard } from 'Examples/flappy-bird/ScoreBoard';

@Class()
export class MainScene extends Scene {

  /**
   * Manage all game object in scene
   */
  public start(): void {
    super.start();

    const background = instantiate(Background);
    background.layer = BuiltInLayer.Background;
    this.add(background);

    const bird = instantiate(Bird);
    this.add(bird, new Vector(-this.screen.width / 4, 0));

    const pipes = [
      instantiate(Pipe),
      instantiate(Pipe),
      instantiate(Pipe),
      instantiate(Pipe)
    ];
    pipes.forEach(pipe => this.add(pipe));

    const score = instantiate(Score);
    score.layer = BuiltInLayer.UI;
    this.add(score, new Vector(0, this.screen.height / 3));

    const splash = instantiate(Splash);
    splash.layer = BuiltInLayer.UI;
    this.add(splash);

    const scoreBoard = instantiate(ScoreBoard);
    scoreBoard.layer = BuiltInLayer.UI;
    this.add(scoreBoard);

    /**
     * Control game rules in game manager.
     */
    const gameManager = instantiate(GameManager);
    gameManager.background = background;
    gameManager.splash = splash;
    gameManager.score = score;
    gameManager.pipes = pipes;
    gameManager.bird = bird;
    gameManager.scoreBoard = scoreBoard;
    this.add(gameManager);
  }

}
