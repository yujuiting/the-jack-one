import 'Engine/preset';
import { bootstrap,
         instantiate,
         def,
         DEBUG,
         DEBUG_PHYSICS,
         DEBUG_RENDERER,
         getService } from 'Engine/runtime';
import { Screen } from 'Engine/Display/Screen';

// Display log and meta info
def(DEBUG);

// Display collider bounds
// def(DEBUG_PHYSICS);

// Display rendering bounds
// def(DEBUG_RENDERER);

import { MainScene } from './MainScene';
import { bundle } from './resource';

/**
 * Hardcode screen size here.
 * Because camera rect did not work perfect currently.
 */
const screen = <Screen>getService(Screen);
screen.setSize(375, 667);

const mainScene = instantiate(MainScene);
mainScene.resources.add(bundle);

bootstrap(mainScene);
