/**
 * Color
 */
export class Color {

  public static White: Color = new Color(255, 255, 255);

  public static Black: Color = new Color(0, 0, 0);

  public static Red: Color = new Color(255, 0, 0);

  public static Green: Color = new Color(0, 255, 0);

  public static Blue: Color = new Color(0, 0, 255);

  public static Yellow: Color = new Color(255, 255, 0);

  public static Cyan: Color = new Color(0, 255, 255);

  public static Purple: Color = new Color(255, 0, 255);

  public static Parse(colorString: string): Color {

    colorString = colorString.replace(/\s/g, '');

    const hexRegex = /#[0-9a-fA-F]{3,6}/;
    const rgbRegex = /rgb.?([0-9.]+),([0-9.]+),([0-9.]+)/;
    const rgbaRegex = /rgba.?([0-9.]+),([0-9.]+),([0-9.]+),([0-9.]+)/;

    if (hexRegex.test(colorString)) {
      return Color.CreateByHexRgb(colorString);
    }

    if (rgbaRegex.test(colorString)) {
      const match = colorString.match(rgbaRegex);
      if (match !== null) {
        return new Color(
          parseInt(match[1], 10),
          parseInt(match[2], 10),
          parseInt(match[3], 10),
          parseFloat(match[4]));
      }
    }

    if (rgbRegex.test(colorString)) {
      const match = colorString.match(rgbRegex);
      if (match !== null) {
        return new Color(
          parseInt(match[1], 10),
          parseInt(match[2], 10),
          parseInt(match[3], 10));
      }
    }

    throw new TypeError(`unknown color ${colorString}`);
  }

  public static CreateByHexRgb(hexColorString: string): Color {
    hexColorString = hexColorString.replace(' ', '').replace('#', '');

    if (hexColorString.length === 3) {
      return new Color(
        parseInt(hexColorString[0] + hexColorString[0], 16),
        parseInt(hexColorString[1] + hexColorString[1], 16),
        parseInt(hexColorString[2] + hexColorString[2], 16));
    } else {
      for (let i = 0; i < (6 - hexColorString.length); i++) {
        hexColorString += 'f';
      }

      return new Color(
        parseInt(hexColorString.slice(0, 2), 16),
        parseInt(hexColorString.slice(2, 4), 16),
        parseInt(hexColorString.slice(4, 6), 16));
    }
  }

  constructor(public red: number = 255,
              public green: number = 255,
              public blue: number = 255,
              public alpha: number = 1) {
    this.setAlpha(alpha);
  }

  public toString(): string {
    return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
  }

  public toHexString(): string {
    let r = this.red.toString(16);
    let g = this.green.toString(16);
    let b = this.blue.toString(16);
    let a = this.alpha.toString(16);
    if (r.length < 2) {
      r = `0${r}`;
    }
    if (g.length < 2) {
      g = `0${g}`;
    }
    if (b.length < 2) {
      b = `0${b}`;
    }
    if (a.length < 2) {
      a = `0${a}`;
    }

    return `#${r}${g}${b}`;
  }

  public setAlpha(alpha: number): void {
    if (alpha <= 1) {
      alpha = Math.floor(alpha * 255);
    }

    this.alpha = alpha;
  }

}
