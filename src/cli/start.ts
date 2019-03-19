import * as fs from "fs";
import * as path from "path";
import * as lib from "..";

const logger = console;

const nodes = parseInt(process.argv[3], 10);
const mode = process.argv[4];
const name = process.argv[5];
const modulePath = process.argv[6];

if (process.argv.length !== 7) {
  throw new Error(`usage: miqro start <nodes> <mode> <name> <microservice.js>`);
}
if (isNaN(nodes)) {
  throw new Error(`<nodes> must be a number!\nusage: miqro start <nodes> <mode> <name> <microservice.js>`);
}
if (typeof mode !== "string") {
  throw new Error(`<mode> must be a string!\nusage: miqro start <nodes> <mode> <name> <microservice.js>`);
}
if (["cluster", "simple"].indexOf(mode) === -1) {
  throw new Error(`<mode> only can be a cluster or simple!\nusage: miqro start <nodes> <mode> <name> <microservice.js>`);
}
if (typeof name !== "string") {
  throw new Error(`<name> must be a string!\nusage: miqro start <nodes> <mode> <name> <microservice.js>`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!\nusage: miqro start <nodes> <mode> <name> <microservice.js>`);
}

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  throw new Error(`microservice [${service}] doesnt exists!`);
}

const micro = new lib.Micro({
  name,
  service,
  nodes,
  mode: mode as any
});

micro.start().catch((e) => {
  logger.error(e);
});
