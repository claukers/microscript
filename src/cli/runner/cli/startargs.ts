import {existsSync} from "fs";
import {basename, resolve} from "path";

export const startArgs = (usage: string): { nodes: number; modulePath: string; name: string; mode: string; logger: any; service: string } => {
  let nodes;
  let modulePath;
  let name;
  let mode;
  const logger = console;

  if (process.argv.length === 4) {
    mode = "simple";
    modulePath = process.argv[3];
    nodes = 1;
    name = basename(modulePath, ".js");
  } else if (process.argv.length === 5) {
    mode = process.argv[3];
    modulePath = process.argv[4];
    nodes = 1;
    name = basename(modulePath, ".js");
  } else if (process.argv.length === 6) {
    mode = process.argv[4];
    nodes = parseInt(process.argv[3], 10);
    modulePath = process.argv[5];
    name = basename(modulePath, ".js");
  } else {
    logger.error(`missing args.`);
    throw new Error(usage);
  }
  if (isNaN(nodes)) {
    throw new Error(`<nodes> must be a number!\n${usage}`);
  }
  if (typeof mode !== "string") {
    throw new Error(`<mode> must be a string!\n${usage}`);
  }
  if (["cluster", "simple"].indexOf(mode) === -1) {
    throw new Error(`<mode> only can be a cluster or simple!\n${usage}`);
  }
  if (typeof modulePath !== "string") {
    throw new Error(`<microservice.js> must be a string!\n${usage}`);
  }

  const service = resolve(modulePath);

  if (!existsSync(service)) {
    // noinspection SpellCheckingInspection
    throw new Error(`microservice [${service}] doesnt exists!`);
  }
  return {
    nodes, modulePath, name, mode, logger, service
  };
};
