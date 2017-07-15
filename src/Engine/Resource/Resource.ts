export interface Resource {
  isLoaded: boolean;
  load(): Promise<void>;
}
