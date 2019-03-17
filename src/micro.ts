import * as scriptpool from "script-pool";
import * as path from "path";
import { EventEmitter } from "events";

export interface MicroConfig {
  name: string;
  nodes: number;
  service: string;
}

export class Micro extends EventEmitter {
  private pool;
  constructor(config?: MicroConfig) {
    super();
    this.pool = scriptpool.createClusterPool({
      min: config.nodes,
      max: config.nodes,
      autostart: false
    }, path.resolve(__dirname, 'instance'), [config.name, config.service]);
    this.pool.on('factoryCreateError', (err) => {
      this.emit('factoryCreateError', err);
    });
    this.pool.on('factoryDestroyError', (err) => {
      this.emit('factoryDestroyError', err);
    });
  }
  public async start() {
    await this.pool.start();
  }
  public async stop() {
    await this.pool.drain();
    await this.pool.clear();
  }
}
