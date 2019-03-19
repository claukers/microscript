import { EventEmitter } from "events";
import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";
import { ISimpleMap, Util } from "../util";
import { setupDB } from "../util/loader";

export type DataBaseState = "stopped" | "starting" | "started" | "startstop" | "error";

export interface IModelMap extends ISimpleMap<Sequelize.Model<any, any>> {
}

let logger = null;

export class Database extends EventEmitter {
  public static events: DataBaseState[] = ["stopped", "starting", "started", "startstop", "error"];
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  private static instance: Database = null;
  public models: IModelMap = {};
  private state: DataBaseState = "stopped";
  private sequelize: Sequelize.Sequelize;
  constructor() {
    super();
    if (logger === null) {
      logger = Util.getLogger("DataBase");
    }
    const requiredEnvVariables = ["DB_DROPTABLES"];
    Util.checkEnvVariables(requiredEnvVariables);
    const models = setupDB();
    this.sequelize = models.sequelize;
    Object.keys(models).forEach((modelName) => {
      if (modelName !== "sequelize" && modelName !== "Sequelize") {
        this.models[modelName] = models[modelName];
      }
    });
  }

  public async transaction(transactionCB: (t: Sequelize.Transaction) => PromiseLike<any>) {
    await this.sequelize.transaction((t: Sequelize.Transaction) => {
      return transactionCB(t);
    });
  }

  public async query(q: { query: string, values: any[] }, t?) {
    if (t) {
      return this.sequelize.query(q, { transaction: t });
    } else {
      return this.sequelize.query(q);
    }
  }

  public async start() {
    if (this.state !== "stopped") {
      throw new Error("DataBase not stopped!");
    }
    this.stateChange("starting");
    return new Promise<void>((resolve, reject) => {
      this.sequelize
        .authenticate()
        .then(async () => {
          if (process.env.DB_DROPTABLES === "true") {
            const tR = [];
            for (const name of Object.keys(this.models)) {
              const model = this.models[name];
              tR.push(model.sync({
                force: true
              }));
            }
            await Promise.all(tR);
          }
          this.stateChange("started");
          resolve();
        }).catch((e) => {
          this.stateChange("error", e);
          reject();
        });
    });
  }

  public async stop() {
    if (this.state !== "started") {
      const err = new Error("DataBase not started!");
      this.emit("error", err);
      throw err;
    }
    try {
      this.stateChange("startstop");
      await this.sequelize.close();
      this.stateChange("stopped");
    } catch (e) {
      this.stateChange("error", e);
      throw e;
    }
  }

  private stateChange(state: DataBaseState, args?: any) {
    if (Database.events.indexOf(state) !== -1) {
      this.state = state;
      this.emit(this.state, args);
    } else {
      throw new Error("Unknow state");
    }
  }
}
