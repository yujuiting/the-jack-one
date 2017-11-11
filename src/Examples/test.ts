import 'Engine/preset';
import { Sound } from 'Engine/Resource/Sound';
import { getService, instantiate } from 'Engine/runtime';
import { MouseInput } from 'Engine/Input/MouseInput';
import { AudioPlayerComponent } from 'Engine/Media/AudioPlayerComponent';

// tslint:disable max-classes-per-file no-stateless-class

// import { instantiate, bootstrap, def, DEBUG, DEBUG_RENDERER } from 'Engine/runtime';
// def(DEBUG);
// def(DEBUG_RENDERER);

// import { GameObject } from 'Engine/Core/GameObject';
// import { Scene } from 'Engine/Core/Scene';
// // import { Screen } from 'Engine/Display/Screen';
// import { SceneManager } from 'Engine/Core/SceneManager';
// import { Class } from 'Engine/Decorator/Class';
// // import { TextRendererComponent } from 'Engine/Render/TextRendererComponent';
// import { KeyboardInput } from 'Engine/Input/KeyboardInput';
// import { SpriteRendererComponent } from 'Engine/Render/SpriteRendererComponent';
// import { SpriteSheetRendererComponent } from 'Engine/Render/SpriteSheetRendererComponent';
// import { Sprite } from 'Engine/Display/Sprite';
// import { SpriteSheet } from 'Engine/Display/SpriteSheet';
// import { Texture } from 'Engine/Resource/Texture';
// import { Inject } from 'Engine/Decorator/Inject';
// import { LineRendererComponent } from 'Engine/Render/LineRendererComponent';
// import { Vector } from 'Engine/Math/Vector';
// import { Color } from 'Engine/Display/Color';
// import { Logger } from 'Engine/Core/Logger';

// @Class()
// class Subject extends GameObject {
//   // public renderer = this.addComponent(TextRendererComponent);
//   // public renderer = this.addComponent(SpriteRendererComponent);
//   public renderer = this.addComponent(SpriteSheetRendererComponent);
//   // public renderer = this.addComponent(LineRendererComponent);
// }

// @Class()
// class World {

//   constructor(@Inject(SceneManager) sceneManager: SceneManager,
//               @Inject(KeyboardInput) keyboardInput: KeyboardInput,
//               @Inject(Logger) logger: Logger) {
//     const scene = instantiate(Scene);
//     sceneManager.add(scene);

//     // const texture = new Texture('./assets/rect.png');
//     const texture = new Texture('./assets/flappy-bird/bird.png');
//     const sprite = new Sprite(texture);
//     sprite.rect.position.reset(0, 0);
//     sprite.rect.width = 210;
//     sprite.rect.height = 200;
//     const spritesheet = new SpriteSheet(
//       texture,
//       [
//         { x:   0, y: 0, width: 210, height: 200 },
//         { x: 210, y: 0, width: 210, height: 200 },
//         { x: 420, y: 0, width: 210, height: 200 }
//       ],
//       6
//     );

//     scene.resources.add(texture);

//     const subject = instantiate(Subject);
//     // subject.renderer.text = 'Hello Engine';
//     // subject.renderer.sprite = sprite;
//     subject.renderer.spriteSheet = spritesheet;
//     // subject.renderer.sprite = <Sprite>spritesheet.getSprite('default', 0);
//     // subject.transform.scale.setTo(1.4, 1);
//     // subject.renderer.addPoint(
//     //   new Vector(100, 100),
//     //   new Vector(100, -100),
//     //   new Vector(-100, -100),
//     //   new Vector(-100, 100)
//     // );
//     // subject.renderer.closePath = true;
//     // subject.renderer.strokeColor = Color.Blue;
//     // subject.transform.position.reset(100, 0);
//     scene.add(subject);

//     const onKeyDown$ = keyboardInput.keyDown$.map(e => e.key);
//     onKeyDown$.filter(code => code === 'w').subscribe(() => subject.transform.position.y += 10);
//     onKeyDown$.filter(code => code === 's').subscribe(() => subject.transform.position.y -= 10);
//     onKeyDown$.filter(code => code === 'd').subscribe(() => subject.transform.position.x += 10);
//     onKeyDown$.filter(code => code === 'a').subscribe(() => subject.transform.position.x -= 10);
//     onKeyDown$.filter(code => code === 'q').subscribe(() => subject.transform.rotation += Math.PI / 6);
//     onKeyDown$.filter(code => code === 'e').subscribe(() => subject.transform.rotation -= Math.PI / 6);
//     onKeyDown$.filter(code => code === 'c').subscribe(() => subject.transform.scale.add(0.1));
//     onKeyDown$.filter(code => code === 'z').subscribe(() => subject.transform.scale.add(-0.1));

//     onKeyDown$.subscribe(key => logger.log(`key down: ${key}`));
//   }

// }

// instantiate(World);

// bootstrap().catch(console.error);

const sound = new Sound('./assets/nyan.wav');

// const mouseInput = getService(MouseInput);

// const globalGain = new AudioContext().createGain();

// function play(volume = 0.1) {
//   const gain = sound.context.createGain();
//   gain.connect(sound.context.destination);

//   const source = sound.context.createBufferSource();
//   source.buffer = sound.data;
//   source.loop = true;
//   source.connect(gain);

//   gain.gain.value = volume;

//   source.start();

//   return { gain, source };
// }

const audioPlayer = (<any>window).audioPlayer = instantiate(AudioPlayerComponent);

audioPlayer.source = sound;
audioPlayer.volume = 0.1;
audioPlayer.playbackRate = 1;
// audioPlayer.loop = true;

(async () => {
  await sound.load();
  audioPlayer.play();
})();

// (<any>window).play = play;
// (<any>window).globalGain = globalGain;
