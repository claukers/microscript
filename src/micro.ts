import * as child_process from "child_process";
import { EventEmitter } from "events";
import * as path from "path";
import * as scriptpool from "script-pool";

const logger = console;

export type IMode = "cluster" | "fork" | "simple";

export interface IMicroConfig {
  name: string;
  nodes?: number;
  mode?: IMode;
  service: string;
}

export class Micro extends EventEmitter {
  private pool;
  constructor(config?: IMicroConfig) {
    super();
    // TODO use config.mode
    // TODO check nodes warn if set when config mode simple
    this.pool = scriptpool.createClusterPool({
      min: config.nodes,
      max: config.nodes,
      autostart: false
    }, path.resolve(__dirname, "instance"), [config.name, config.service]);
    this.pool.on("factoryCreateError", (err) => {
      this.emit("factoryCreateError", err);
    });
    this.pool.on("factoryDestroyError", (err) => {
      this.emit("factoryDestroyError", err);
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
