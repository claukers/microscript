import * as fs from "fs";
import * as path from "path";
import { Miqro } from "../miqro";

const logger = console;

const nodes = parseInt(process.argv[3], 10);
const mode = process.argv[4];
const modulePath = process.argv[5];
const name = path.basename(modulePath);

if (process.argv.length !== 6) {
  throw new Error(`usage: miqro start <nodes> <mode> <microservice.js>`);
}
if (isNaN(nodes)) {
  throw new Error(`<nodes> must be a number!\nusage: miqro start <nodes> <mode> <microservice.js>`);
}
if (typeof mode !== "string") {
  throw new Error(`<mode> must be a string!\nusage: miqro start <nodes> <mode> <microservice.js>`);
}
if (["cluster", "simple"].indexOf(mode) === -1) {
  throw new Error(`<mode> only can be a cluster or simple!\nusage: miqro start <nodes> <mode> <microservice.js>`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!\nusage: miqro start <nodes> <mode> <microservice.js>`);
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
