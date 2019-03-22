"use strict";

import * as  express from "express";
import * as  path from "path";
import { Util } from "../util";

export const setupDB = () => {
  const sequelizerc = require(path.resolve(process.env.MICRO_DIRNAME, ".sequelizerc"));
  return require(sequelizerc["models-path"]);
};

export const setupInstance = (serviceName, scriptPath) => {
  Util.setupInstanceEnv(serviceName, scriptPath);
  Util.loadConfig();

  const logger = Util.getLogger(`${serviceName}`);

  logger.info(`config loaded [${process.env.MICRO_DIRNAME}]!`);

  logger.info(`loading script [${scriptPath}]!`);
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
  return new Promise((resolve, reject) => {
    logger.info(`launching script [${scriptPath}]`);
    script(express()).then((app) => {
      const server = app.listen(process.env.PORT, (err) => {
        if (err) {
          reject(err);
        } else {
          logger.info(`script [${scriptPath}] started on [${process.env.PORT}]`);
          resolve({ app, server });
        }
      });
    }).catch((e) => {
      logger.error(e);
      logger.error(e.stack);
    });
  });
};
