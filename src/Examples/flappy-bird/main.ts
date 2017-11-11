import 'Engine/preset';
import { bootstrap, instantiate, def, DEBUG, DEBUG_PHYSICS, DEBUG_RENDERER, getService } from 'Engine/runtime';

// Display log and meta info
def(DEBUG);

// Display collider bounds
// def(DEBUG_PHYSICS);

// Display rendering bounds
// def(DEBUG_RENDERER);

import { MainScene } from './MainScene';
import { bundle } from './resource';

const mainScene = instantiate(MainScene);
mainScene.resources.add(bundle);

bootstrap(mainScene);
