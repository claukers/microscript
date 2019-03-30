import * as fs from "fs";
import * as path from "path";
import { Util } from "../util";

const modulePath = process.argv[3];
const logger = console;

if (process.argv.length !== 4) {
  throw new Error(`usage: miqro reset <microservice.js>`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!\nusage: miqro reset <microservice.js>`);
}

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  throw new Error(`microservice [${service}] doesnt exists!`);
}

Util.setupInstanceEnv("automigrate", service);
const dbFolder = path.resolve(process.env.MIQRO_DIRNAME, "db");
const dbConfigFolder = path.resolve(process.env.MIQRO_DIRNAME, "config");
const modelsFolder = path.resolve(dbFolder, "models");
const sequelizercPath = path.resolve(process.env.MIQRO_DIRNAME, ".sequelizerc");
const modelLoaderPath = path.resolve(modelsFolder, "index.js");
const logjsPath = path.resolve(process.env.MIQRO_DIRNAME, "config", "log.js");
const dbConfigFilePath = path.resolve(dbConfigFolder, "db.js");

const saveUnLink = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (e) {
    logger.error(e.message);
  }
};
saveUnLink(sequelizercPath);
saveUnLink(modelLoaderPath);
saveUnLink(logjsPath);
saveUnLink(dbConfigFilePath);
