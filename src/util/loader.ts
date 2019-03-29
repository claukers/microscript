"use strict";

import * as  express from "express";
import * as  path from "path";
import { setupMiddleware } from "../middleware";
import { Util } from "../util";

export const setupDB = () => {
  Util.checkEnvVariables(["MIQRO_DIRNAME"]);
  const sequelizerc = require(path.resolve(process.env.MIQRO_DIRNAME, ".sequelizerc"));
  return require(sequelizerc["models-path"]);
};

export const winstonConfig = () => {
  Util.checkEnvVariables(["MIQRO_DIRNAME"]);
  const logPath = path.resolve(process.env.MIQRO_DIRNAME, "config", "log.js");
  const logConfig = require(logPath);
  return logConfig;
};

export const setupInstance = (serviceName, scriptPath) => {
  Util.setupInstanceEnv(serviceName, scriptPath);
  Util.loadConfig();

  const logger = Util.getLogger(`${serviceName}`);

  logger.info(`config loaded from [${process.env.MIQRO_DIRNAME}]`);

  logger.info(`loading script from [${scriptPath}]!`);
  /* tslint:disable */
  const script = require(scriptPath);
  /* tslint:enable */
  return {
    script,
    logger
  };
};

export const runInstance = async (logger, script, scriptPath) => {
  Util.checkEnvVariables(["PORT"]);
  return new Promise(async (resolve, reject) => {
    logger.info(`launching script`);
    const bApp = express();
    await setupMiddleware(bApp, logger);
    script(bApp).then((app) => {
      const server = app.listen(process.env.PORT, (err) => {
        if (err) {
          reject(err);
        } else {
          logger.info(`script started on [${process.env.PORT}]`);
          resolve({ app, server });
        }
      });
    }).catch((e) => {
      logger.error(e);
      logger.error(e.stack);
    });
  });
};
