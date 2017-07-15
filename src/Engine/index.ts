/**
 * import extensions
 */
// import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import 'reflect-metadata';

import { Engine } from 'Engine/Base/Engine';
import { Screen } from 'Engine/Render/Screen';
import { Time } from 'Engine/Time/Time';
import { SceneManager } from 'Engine/Base/SceneManager';

export * from 'Engine/Base/Component';
export * from 'Engine/Base/Engine';
export * from 'Engine/Base/GameObject';
export * from 'Engine/Base/Scene';

export const engine = Engine.Get();
export const screen = Screen.Get();
export const time = Time.Get();
export const sceneManager = SceneManager.Get();
