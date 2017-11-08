import { Color } from 'Engine/Display/Color';

export const Logger = Symbol('Logger');

export interface LogInfo {
  message: string;
  color: Color;
}

/**
 * Logger will only update and render when DEBUG defined.
 */
export interface Logger {
  logs: ReadonlyArray<LogInfo>;
  defaultColor: Color;
  fontSize: number;
  log(message: string, color?: Color): void;
  update(): void;
  render(ctx: CanvasRenderingContext2D): void;
}
