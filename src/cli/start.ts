import * as fs from "fs";
import * as path from "path";
import { Miqro } from "../miqro";

const usage = `usage: miqro start [nodes=1] [mode=simple] <microservice.js>`;

const logger = console;

let nodes;
let modulePath;
let name;
let mode;

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
