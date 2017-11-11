import { Texture } from 'Engine/Resource/Texture';
import { Resource } from 'Engine/Resource/Resource';
import { Font } from 'Engine/Resource/Font';
import { Sound } from 'Engine/Resource/Sound';
import { Bundle } from 'Engine/Resource/Bundle';

export const texture_bird = new Texture('./assets/flappy-bird/bird.png');

export const texture_pipe = new Texture('./assets/flappy-bird/pipe.png');

export const texture_sky = new Texture('./assets/flappy-bird/background.png');

export const texture_ground = new Texture('./assets/flappy-bird/ground.png');

export const font = new Font('FlappyBird', 'truetype', './assets/flappy-bird/font.ttf');

export const texture_splash = new Texture('./assets/flappy-bird/splash.png');

export const texture_scoreboard = new Texture('./assets/flappy-bird/scoreboard.png');

export const texture_medal_bronze = new Texture('./assets/flappy-bird/medal_bronze.png');

export const texture_medal_gold = new Texture('./assets/flappy-bird/medal_gold.png');

export const texture_medal_platinum = new Texture('./assets/flappy-bird/medal_platinum.png');

export const texture_medal_silver = new Texture('./assets/flappy-bird/medal_silver.png');

export const sfx_point = new Sound('./assets/flappy-bird/sfx_point.wav');

export const sfx_wing = new Sound('./assets/flappy-bird/sfx_wing.wav');

export const sfx_hit = new Sound('./assets/flappy-bird/sfx_hit.wav');

export const sfx_die = new Sound('./assets/flappy-bird/sfx_die.wav');

export const bundle = new Bundle('game resources', [
  texture_bird,
  texture_pipe,
  texture_sky,
  texture_ground,
  font,
  texture_splash,
  texture_scoreboard,
  texture_medal_bronze,
  texture_medal_gold,
  texture_medal_platinum,
  texture_medal_silver,
  sfx_point,
  sfx_wing,
  sfx_hit,
  sfx_die
]);
