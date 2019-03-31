import * as fs from "fs";
import * as path from "path";
import { Util } from "../util";
import { templates } from "../util/templates";

const logger = console;
const modulePath = process.argv[3];

if (process.argv.length !== 4) {
  throw new Error(`usage: miqro init <microservice.js>`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!\nusage: miqro automigrate <microservice.js>`);
}

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  logger.warn(`microservice [${service}] doesnt exists!`);
  logger.warn(`creating [${service}]!`);
  const mainjsPath = path.resolve(path.dirname(service), 'main.js');
  fs.writeFileSync(service, templates.indexjs());
  if (!fs.existsSync(mainjsPath)) {
    fs.writeFileSync(mainjsPath, templates.mainjs(path.basename(service)));
  }
}

Util.setupInstanceEnv("automigrate", service);
Util.loadConfig(true);
