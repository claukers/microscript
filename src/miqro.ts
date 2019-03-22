import { EventEmitter } from "events";
import * as path from "path";
import * as scriptpool from "script-pool";
import { runInstance, setupInstance } from "./util/loader";

const logger = console;

export type IMode = "cluster" | "fork" | "simple";

export interface IMicroConfig {
  name: string;
  nodes?: number;
  mode?: IMode;
  service: string;
}

export class Miqro extends EventEmitter {
  private pool;
  private instanceApp;
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
      case "fork":
        if (config.nodes !== 1) {
          throw new Error(`${config.nodes} not supported in fork mode (try 1 or cluster mode)!`);
        }
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
        break;
      case "simple":
        if (config.nodes !== 1) {
          throw new Error(`${config.nodes} not supported in simple mode (try 1 or cluster mode)!`);
        }
        break;
      default:
        throw new Error(`mode ${config.mode} not supported!`);
    }
    // TODO use config.mode
    // TODO check nodes warn if set when config mode simple

  }
  public async start() {
    if (this.pool) {
      await this.pool.start();
    } else if (this.config.mode === "simple") {
      this.simpleInstance = setupInstance(this.config.name, this.config.service);
      this.instanceApp = await runInstance(this.simpleInstance.logger, this.simpleInstance.script, this.config.service);
    }
  }
  public async stop() {
    if (this.pool) {
      await this.pool.drain();
      await this.pool.clear();
    } else if (this.instanceApp) {
      this.instanceApp.server.close();
    }
  }
}
