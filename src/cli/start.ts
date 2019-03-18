import * as fs from "fs";
import * as path from "path";
import * as lib from "..";

const logger = console;

const nodes = parseInt(process.argv[3], 10);
const name = process.argv[4];
const modulePath = process.argv[5];

if (process.argv.length !== 6) {
  throw new Error(`usage: microscript start <nodes> <name> <microservice.js>`);
}
if (isNaN(nodes)) {
  throw new Error(`<nodes> must be a number!\nusage: microscript start <nodes> <name> <microservice.js>`);
}
if (typeof name !== "string") {
  throw new Error(`<name> must be a string!\nusage: microscript start <nodes> <name> <microservice.js>`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!\nusage: microscript start <nodes> <name> <microservice.js>`);
}

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  throw new Error(`microservice [${service}] doesnt exists!`);
}

const micro = new lib.Micro({
  name,
  service,
  nodes
});

micro.start().catch((e) => {
  logger.error(e);
});
