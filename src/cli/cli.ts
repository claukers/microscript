#!/usr/bin/env node

import { ISimpleMap } from "../util";

const logger = console;

const cmds: ISimpleMap<{ module: string; description: string }> = {
  start: { module: "./start", description: "starts a microservice" },
  makemigrations: { module: "./makemigrations", description: "seeks changes in your microservice models and creates database migrations" }
};

const main = async () => {
  const cmdArg = process.argv[2];
  if (!cmdArg) {
    logger.info(`Available commands:`);
    for (const cmd of Object.keys(cmds)) {
      logger.info(`\t${cmd}\t${cmds[cmd].description}`);
    }
    throw new Error("no command");
  } else {
    const cmd = cmds[cmdArg];
    if (!cmd) {
      logger.info(`Available commands:`);
      for (const cmdName of Object.keys(cmds)) {
        logger.info(`\t${cmdName}\t${cmds[cmdName].description}`);
      }
      throw new Error("command " + cmdArg + " not found!");
    } else {
      require(cmd.module);
    }
  }
};

main().catch((e) => {
  logger.error(`usage: microscript <command> [args]`);
  logger.error(e);
  process.exit(1);
});
