import { Resource } from 'Engine/Resource/Resource';
import { Inject } from 'Engine/Decorator/Inject';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';

export class Font extends Resource {

  public static CssTemplate = '@font-face { font-family: \'{fontFamily}\'; src: url(\'{url}\') format(\'{format}\'); }';

  @Inject(BrowserDelegate)
  private browser: BrowserDelegate;

  constructor(public readonly fontFamily: string,
              public readonly format: string,
              path: string) {
    super(path);
    this._responseType = 'blob';
  }

  protected async processData(data: any): Promise<void> {
    const blobUrl = await super.processData(data);
    const style = this.browser.document.createElement('style');
    style.textContent = Font.CssTemplate
      .replace('{fontFamily}', this.fontFamily)
      .replace('{url}', blobUrl)
      .replace('{format}', this.format);

    this.browser.document.head.appendChild(style);
  }

}
