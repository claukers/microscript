import * as fs from "fs";
import * as path from "path";
import * as watch from "watch";
import { Miqro } from "../miqro";

const usage = `usage: miqro watch [nodes=1] [mode=simple] <microservice.js>`;

const logger = console;

let nodes, modulePath, name, mode;

if (process.argv.length === 4) {
  mode = "simple";
  modulePath = process.argv[3];
  nodes = 1;
  name = path.basename(modulePath);
} else if (process.argv.length === 5) {
  mode = process.argv[3];
  modulePath = process.argv[4];
  nodes = 1;
  name = path.basename(modulePath);
} else if (process.argv.length === 6) {
  mode = process.argv[4];
  nodes = parseInt(process.argv[3], 10);
  modulePath = process.argv[5];
  name = path.basename(modulePath);
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

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  throw new Error(`microservice [${service}] doesnt exists!`);
}

const micro = new Miqro({
  name,
  service,
  nodes,
  mode: mode as any
});

micro.start().catch((e) => {
  logger.error(e);
});

const serviceDirname = path.resolve(path.dirname(service));

let restartTimeout = null;
const restart = () => {
  logger.warn("restart queue");
  clearTimeout(restartTimeout);
  restartTimeout = setTimeout(async () => {
    logger.warn("restarting");
    await micro.stop();
    await micro.start();
  }, 2000);
};
logger.log(`watching ${serviceDirname}`);
watch.watchTree(serviceDirname, (f, curr, prev) => {
  if (typeof f == "object" && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
    logger.log(`${f} new file`);
    restart();
  } else if (curr.nlink === 0) {
    // f was removed
    logger.log(`${f} removed`);
    restart();
  } else {
    // f was changed
    logger.log(`change in ${f}`);
    restart();
  }
});
