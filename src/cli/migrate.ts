import * as fs from "fs";
import * as path from "path";
import * as lib from "..";
import { Util } from "../util";

const modulePath = process.argv[3];

if (process.argv.length !== 4) {
  throw new Error(`usage: miqro migrate <microservice.js>`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!\nusage: miqro migrate <microservice.js>`);
}

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  throw new Error(`microservice [${service}] doesnt exists!`);
}

Util.setupInstanceEnv("migrate", service);
Util.loadConfig();
lib.migrate();
