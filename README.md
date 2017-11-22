# The Jack One

[![CircleCI](https://circleci.com/gh/yujuiting/the-jack-one.svg?style=svg)](https://circleci.com/gh/yujuiting/the-jack-one)
[![Build Status](https://travis-ci.org/yujuiting/the-jack-one.svg?branch=ci%2Fsetup-travis)](https://travis-ci.org/yujuiting/the-jack-one)
[![Coverage Status](https://coveralls.io/repos/github/yujuiting/the-jack-one/badge.svg?branch=master)](https://coveralls.io/github/yujuiting/the-jack-one?branch=master)
[![codecov](https://codecov.io/gh/yujuiting/the-jack-one/branch/master/graph/badge.svg)](https://codecov.io/gh/yujuiting/the-jack-one)

I love game, love typescript and ______________Jack.
That is what this project existed!!

This is a game with its own engine named `The Jack`.
Dedicated to Jack.

## The Jack One
`The Jack One` is an [ECS](https://en.wikipedia.org/wiki/Entity–component–system) game engine.
This project focus on custom engine development, game is a side project for quick concept and function testing.

Aim to create a highly modularized and elegant game engine.

## Examples

- physics [[src](https://github.com/yujuiting/the-jack-one/blob/master/src/Examples/physics.ts)][[demo](https://yujuiting.github.io/the-jack-one/examples/physics.html)]

- manage cameras [[src](https://github.com/yujuiting/the-jack-one/blob/master/src/Examples/manage-cameras.ts)][[demo](https://yujuiting.github.io/the-jack-one/examples/manage-cameras.html)]

- control camera [[src](https://github.com/yujuiting/the-jack-one/blob/master/src/Examples/control-camera.ts)][[demo](https://yujuiting.github.io/the-jack-one/examples/control-camera.html)]

- Flappy Bird [[src](https://github.com/yujuiting/the-jack-one/tree/master/src/Examples/flappy-bird)][[demo](https://yujuiting.github.io/the-jack-one/examples/flappy-bird.html)]

## Installation
[node-canvas](https://github.com/Automattic/node-canvas#installation)

## Roadmap & Notes
- Engine
  - ~~Physics~~
    - ~~PolygonCollider~~
    - ~~Oriented rigid bodies~~
      - Add force at specific point should cause torque.
    - ~~Sleep mechanism~~
    - Check formula
    - Constraints
  - ~~Camera Manipulation~~
    - Rect control
  - ParticleSystem
  - Refactor lifecycle system
  - ~~Audio~~
    - Seems audio can not play without user action.
  - Animation??

## Dependencies
- `rxjs`: For events manipulation.
- `reflect-metadata`: For decorator function implementment.

## Studies & References

### Engine
[Grafferon Games](https://gafferongames.com)

### Physics
- [Coding Math Youtube Channel](https://www.youtube.com/user/codingmath/videos)

- [How to create a custom 2d physics engine: the basics and impluse resolution](http://gamedevelopment.tutsplus.com/tutorials/how-to-create-a-custom-2d-physics-engine-the-basics-and-impulse-resolution--gamedev-6331)
- [How to create a custom 2d physics engine: the core engine](https://gamedevelopment.tutsplus.com/tutorials/how-to-create-a-custom-2d-physics-engine-the-core-engine--gamedev-7493)
- [How to create a custom 2d physics engine: friction, scene and jump table](http://gamedevelopment.tutsplus.com/tutorials/how-to-create-a-custom-2d-physics-engine-friction-scene-and-jump-table--gamedev-7756)
- [How to create a custom 2d physics engine: oriented rigid bodies](http://gamedevelopment.tutsplus.com/tutorials/how-to-create-a-custom-2d-physics-engine-oriented-rigid-bodies--gamedev-8032)

- [Use SAT to handle collision detection](http://www.dyn4j.org/2010/01/sat/)

### Design Pattern
- [Game Programming Patterns](http://gameprogrammingpatterns.com/contents.html)

### Respectable opponents
- [Excalibur](http://github.com/excaliburjs/Excalibur)
- [Unity](https://docs.unity3d.com/ScriptReference/)

### Requirements
- Node.JS > 8
