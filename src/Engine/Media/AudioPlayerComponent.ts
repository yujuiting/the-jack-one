import { Inject } from 'Engine/Decorator/Inject';
import { BrowserDelegate } from 'Engine/Utility/BrowserDelegate';
import { Component } from 'Engine/Core/Component';
import { GameObject } from 'Engine/Core/GameObject';
import { Sound } from 'Engine/Resource/Sound';
import { forwardRef } from 'Engine/Utility/Type';

forwardRef(() => GameObject);

export class AudioPlayerComponent extends Component {

  protected gainNode: GainNode;

  protected bufferSource: AudioBufferSourceNode;

  private _volume = 1;

  private _loop = false;

  private _isPaused = false;

  private _isPlaying = false;

  /**
   * When resume, change playback rate, have to calculate pause
   */
  private _lastCalculatedAt = 0;

  /**
   * Has played time from audio started.
   */
  private _elapsedTime = 0;

  private _playbackRate = 1;

  private _source: Sound|undefined;

  public get isPaused(): boolean { return this._isPaused; }

  public get isPlaying(): boolean { return this._isPlaying; }

  public get playbackRate(): number { return this._playbackRate; }

  public set playbackRate(value: number) { this.setPlaybackRate(value); }

  public get volume(): number { return this._volume; }

  public set volume(value: number) { this.setVolume(value); }

  public get loop(): boolean { return this._loop; }

  public set loop(value: boolean) { this.setLoop(value); }

  public get source(): Sound|undefined { return this._source; }

  public set source(value: Sound|undefined) {
    this._source = value;
  }

  constructor(host: GameObject,
              @Inject(BrowserDelegate) private browser: BrowserDelegate) {
    super(host);
  }

  public reset(): void {
    super.reset();

    if (!this._source) {
      return;
    }

    this.createBufferSource(this._source.context, this._source.data);
  }

  public resume(): void {
    if (!this._source || !this._source.isLoaded) {
      return;
    }

    if (!this._isPaused) {
      return;
    }

    this.createBufferSource(this._source.context, this._source.data);
    this.bufferSource.start(0, this._elapsedTime & this._source.duration);
    this._isPaused = false;
    this._isPlaying = true;
  }

  public pause(): void {
    if (!this._isPlaying) {
      return;
    }

    this.calculatePlayedTime();
    this._isPaused = true;
    this.bufferSource.stop(0);
  }

  public play(): void {
    if (!this._source || !this._source.isLoaded) {
      return;
    }

    if (this._isPaused) {
      this.resume();
      return;
    }

    if (this._isPlaying) {
      return;
    }

    this.createBufferSource(this._source.context, this._source.data);
    this.bufferSource.start(0);
    this._isPaused = false;
    this._isPlaying = true;
    this._lastCalculatedAt = Date.now();
  }

  public stop(): void {
    if (!this._isPlaying) {
      return;
    }

    this._elapsedTime = 0;
    this._isPaused = false;
    this.bufferSource.stop(0);
  }

  public setPlaybackRate(value: number): void {
    this._playbackRate = value;

    if (this.bufferSource) {
      this.bufferSource.playbackRate.value = value;
    }
  }

  public setVolume(value: number): void {
    this._volume = value;

    if (this.gainNode) {
      this.gainNode.gain.value = value;
    }
  }

  public setLoop(value: boolean): void {
    this._loop = value;

    if (this.bufferSource) {
      this.bufferSource.loop = value;
    }
  }

  private calculatePlayedTime(): void {
    const now = Date.now();
    this._elapsedTime += (now - this._lastCalculatedAt) / this._playbackRate * 0.001;
    this._lastCalculatedAt = now;
  }

  private createBufferSource(ctx: AudioContext, buffer: AudioBuffer): void {
    if (!this.gainNode) {
      this.gainNode = ctx.createGain();
      // Connect gain node to destination
      this.gainNode.connect(ctx.destination);
    }

    this.gainNode.gain.value = this._volume;

    /**
     * No need to stop here.
     * `createBufferSource` should always called after checking play status.
     * Repeatly stop buffer source will throw InvalidStateError in safari.
     */
    // if (this.bufferSource) {
    //   this.bufferSource.stop();
    // }

    this.bufferSource = ctx.createBufferSource();

    /**
     * Connect buffer source to gain node.
     * AudioBuffer -> GainNode -> BufferSource
     */
    this.bufferSource.connect(this.gainNode);
    this.bufferSource.buffer = buffer;
    this.bufferSource.loop = this._loop;
    this.bufferSource.playbackRate.value = this._playbackRate;
    this.bufferSource.onended = e => this.onBufferSourceEnd(e);
  }

  private onBufferSourceEnd(e: MediaStreamErrorEvent) {
    this._isPlaying = false;
  }

}
