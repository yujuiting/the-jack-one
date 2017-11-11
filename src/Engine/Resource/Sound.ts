import { Resource } from 'Engine/Resource/Resource';
import { Inject } from 'Engine/Decorator/Inject';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';

export class Sound extends Resource<AudioBuffer> {

  @Inject(BrowserDelegate)
  private browser: BrowserDelegate;

  private _duration = 0;

  public get duration(): number { return this._duration; }

  public readonly context: AudioContext = this.browser.getAudioContext();

  constructor(path: string) {
    super(path);
    this._responseType = 'arraybuffer';
  }

  protected async processData(data: any): Promise<AudioBuffer|undefined> {
    return new Promise<AudioBuffer>((resolve, reject) => {
      if (!this.context) {
        reject(new Error('Fail to create audio context'));
        return;
      }

      this.context.decodeAudioData(
        data,
        audioBuffer => {
          this._duration = audioBuffer.duration;
          resolve(audioBuffer);
        },
        reject
      );
    });
  }

}
