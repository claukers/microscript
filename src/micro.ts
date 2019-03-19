import * as child_process from "child_process";
import { EventEmitter } from "events";
import * as path from "path";
import * as scriptpool from "script-pool";
import { setupInstance, runInstance } from "./util/loader";

const logger = console;

export type IMode = "cluster" /*| "fork"*/ | "simple";

export interface IMicroConfig {
  name: string;
  nodes?: number;
  mode?: IMode;
  service: string;
}

export class Micro extends EventEmitter {
  private pool;
  private simpleInstance = null;
  constructor(private config: IMicroConfig) {
    super();
    switch (config.mode) {
      case "cluster":
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
        break;
      /*case "fork":
        this.pool = scriptpool.createForkPool({
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
        break;*/
      case "simple":
        if (config.nodes !== 1) {
          throw new Error(`${config.nodes} not supported in simple mode (try 1 or cluster mode)!`);
        }
        break;
      default:
        throw new Error(`${config.mode} not supported!`);
    }
    // TODO use config.mode
    // TODO check nodes warn if set when config mode simple

  }
  public async start() {
    if (this.pool) {
      await this.pool.start();
    } else if (this.config.mode === "simple") {
      this.simpleInstance = setupInstance(this.config.name, this.config.service);
      await runInstance(this.simpleInstance.logger, this.simpleInstance.script, this.config.service);
    }
  }
  public async stop() {
    if (this.pool) {
      await this.pool.drain();
      await this.pool.clear();
    }
  }
}
