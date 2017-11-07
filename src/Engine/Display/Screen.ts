import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Service } from 'Engine/Decorator/Service';

export const Screen = Symbol('Screen');

export interface Screen {

  /**
   * Current available screen width
   */
  readonly width: number;

  /**
   * Current available screen height
   */
  readonly height: number;

  readonly isFullScreen: boolean;

  setFullScreen(enable: boolean): void;

}
