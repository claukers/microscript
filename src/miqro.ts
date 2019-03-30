import { EventEmitter } from "events";
import * as path from "path";
import * as scriptpool from "script-pool";
import { runInstance, setupInstance } from "./util/loader";

const logger = console;

export type IMode = "cluster" | "fork" | "simple";

export type IMiqroState = "stopping" | "stopped" | "starting" | "started";

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
  private restart = null;
  private state: IMiqroState = "stopped";
  constructor(private config: IMicroConfig) {
    super();
    this.configure(config);
  }
  private configure(config) {
    if (this.state !== "stopped") {
      throw new Error(`cannot configured if not stopped!`);
    }
    this.config = config;
    switch (config.mode) {
      case "cluster":
        this.pool = scriptpool.createClusterPool({
          min: config.nodes,
          max: config.nodes,
          autostart: false,
          testOnBorrow: true
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
          autostart: false,
          testOnBorrow: true
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
  }
  private async setupAutostart() {
    if (this.state !== "started") {
      throw new Error(`cannot setupAutostart if not started!`);
    }
    const instances = [];
    for (let node = 0; node < this.config.nodes; node++) {
      const instance = await this.pool.acquire();
      instances.push(instance);
      instance.once("exit", (code) => {
        logger.info(`pid ${instance.pid} died with code [${code}]`);
        logger.info(`planning restart in 2000ms`);
        clearTimeout(this.restart);
        this.restart = setTimeout(async () => {
          logger.info(`restarting dead workers`);
          if (this.state === "started") {
            await this.setupAutostart();
          } else {
            logger.info(`restarting canceled because miqro not started`);
          }
        }, 2000);
      });
    }
    for (const instance of instances) {
      await this.pool.release(instance);
    }
  }
  public async start() {
    if (this.state !== "stopped") {
      throw new Error(`cannot start if not stopped!`);
    }
    this.configure(this.config);
    this.state = "starting";
    if (this.pool) {
      await this.pool.start();
      this.state = "started";
      await this.setupAutostart();
    } else if (this.config.mode === "simple") {
      this.simpleInstance = setupInstance(this.config.name, this.config.service);
      this.instanceApp = await runInstance(this.simpleInstance.logger, this.simpleInstance.script, this.config.service);
      this.state = "started";
    }
  }
  public async stop() {
    if (this.state !== "started") {
      throw new Error(`cannot stop if not started!`);
    }
    this.state = "stopping";
    if (this.pool) {
      await this.pool.drain();
      await this.pool.clear();
      this.state = "stopped";
    } else if (this.instanceApp) {
      this.instanceApp.server.close();
      this.state = "stopped";
    }
  }
}
