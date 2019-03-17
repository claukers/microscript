export class StopWatch {
  private lastMS: number = null;
  private startMS: number = null;
  constructor() {
    this.lastMS = new Date().getTime();
    this.startMS = this.lastMS;
  }
  public lap() {
    const now = new Date().getTime();
    const ret = now - this.lastMS;
    this.lastMS = new Date().getTime();
    return ret;
  }
  public stop() {
    const now = new Date().getTime();
    const ret = now - this.startMS;
    this.lastMS = new Date().getTime();
    this.startMS = this.lastMS;
    return ret;
  }
}
