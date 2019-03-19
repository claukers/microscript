import * as crypto from "crypto";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as winston from "winston";
import { ParseOptionsError } from "./error/";
import { templates } from "./templates";

const {
  format
} = winston;
const {
  combine,
  label,
  printf,
  timestamp
} = format;

const logContainer = new winston.Container();

const logger = console;

const logFormat = printf((info) => {
  const pid = process.pid;
  const envString = pid;
  const component = info.label;
  const level = info.level;
  const text = info.message;
  const ret = `${new Date(info.timestamp).getTime()} ${envString} ` +
    `[${component}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${text}`;
  return ret;
});

export type IOPTIONPARSER = "remove_extra" | "add_extra" | "no_extra";
export type IParseSimpleType = "string" | "boolean" | "number" | "object";
export type IParseType = "string" | "boolean" | "number" | "array";

const isParseSimpleOption = (type: string): boolean => {
  return ["string", "boolean", "number", "object"].indexOf(type) !== -1;
};

const parseSimpleOption = (type: IParseSimpleType, value): boolean => {
  let isType;
  if (type === "number") {
    value = parseInt(value, 10);
    isType = !isNaN(value);
  } else if (type === "boolean") {
    value = value === "true" || value === true ? true : value === "false" || value === false ? false : null;
    isType = value !== null;
  } else {
    isType = typeof value === type;
  }
  return isType;
};

export interface ISimpleMap<T2> {
  [word: string]: T2;
}

export abstract class Util {
  public static sha256 = (data) => crypto.createHash("sha256").update(data, "utf8").digest("base64");
  public static setupSimpleEnv() {
    Util.checkEnvVariables(["MICRO_DIRNAME"]);
    const NODE_ENV = process.env.NODE_ENV || "development";
    process.env.NODE_ENV = NODE_ENV;
    const logsFolder = path.resolve(process.env.MICRO_DIRNAME, "logs");
    process.env.LOG_FILE = path.resolve(logsFolder, `${process.env.NODE_ENV}.log`);
    process.env.LOG_FILE_TRACE = path.resolve(logsFolder, `${process.env.NODE_ENV}-trace.log`);
  }
  public static setupInstanceEnv(serviceName: string, scriptPath: string) {
    const microDirname = path.resolve(path.dirname(scriptPath), "..");
    process.chdir(microDirname);
    process.env.MICRO_DIRNAME = microDirname;
    process.env.MICRO_NAME = serviceName;
    Util.setupSimpleEnv();
  }
  public static loadConfig() {
    Util.checkEnvVariables(["MICRO_DIRNAME"]);
    if (!Util.configLoaded) {
      Util.setupSimpleEnv();
      const configPath = path.resolve(process.env.MICRO_DIRNAME, "config", `${process.env.NODE_ENV}.env`);
      if (!fs.existsSync(configPath)) {
        throw new Error(`[${configPath}] env file doesnt exists!`);
      } else {
        logger.log(`loading ${configPath}`);
      }
      config({
        path: configPath
      });
      const logsFolder = path.resolve(process.env.MICRO_DIRNAME, "logs");
      const dbFolder = path.resolve(process.env.MICRO_DIRNAME, "db");
      const dbConfigFolder = path.resolve(dbFolder, "config");
      const migrationsFolder = path.resolve(dbFolder, "migrations");
      const modelsFolder = path.resolve(dbFolder, "models");
      const seedersFolder = path.resolve(dbFolder, "seeders");
      const sequelizercPath = path.resolve(process.env.MICRO_DIRNAME, ".sequelizerc");
      const modelLoaderPath = path.resolve(modelsFolder, "index.js");
      const dbConfigFilePath = path.resolve(dbConfigFolder, "index.js");
      if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
      }
      if (!fs.existsSync(dbFolder)) {
        fs.mkdirSync(dbFolder);
      }
      if (!fs.existsSync(dbConfigFolder)) {
        fs.mkdirSync(dbConfigFolder);
      }
      if (!fs.existsSync(dbConfigFilePath)) {
        fs.writeFileSync(dbConfigFilePath, templates.dbConfig);
      }
      if (!fs.existsSync(sequelizercPath)) {
        fs.writeFileSync(sequelizercPath, templates.sequelizerc);
      }
      if (!fs.existsSync(migrationsFolder)) {
        fs.mkdirSync(migrationsFolder);
      }
      if (!fs.existsSync(modelsFolder)) {
        fs.mkdirSync(modelsFolder);
      }
      if (!fs.existsSync(modelLoaderPath)) {
        fs.writeFileSync(modelLoaderPath, templates.modelsIndex);
      }
      if (!fs.existsSync(seedersFolder)) {
        fs.mkdirSync(seedersFolder);
      }
      Util.configLoaded = true;
    }
  }
  public static checkEnvVariables(requiredEnvVariables: string[]) {
    requiredEnvVariables.forEach((envName) => {
      if (process.env[envName] === undefined) {
        throw new Error(`Env variable [${envName}!] not defined`);
      }
    });
  }
  public static parseOptions(argName,
                             arg: { [name: string]: any },
                             optionsArray: Array<{
      name: string, type: string, arrayType?: string, required: boolean
    }>,
                             parserOption: IOPTIONPARSER = "no_extra"): { [name: string]: any } {
    const ret = {};
    if (typeof arg !== "object" || !arg) {
      throw new ParseOptionsError(`${argName} not valid`);
    }
    optionsArray.forEach((patchAttr) => {
      const name = patchAttr.name;
      const type = patchAttr.type;
      const arrayType = patchAttr.arrayType;
      const required = patchAttr.required;
      const value = arg[name];
      let isType;
      if (isParseSimpleOption(type)) {
        const sType = type as IParseSimpleType;
        isType = parseSimpleOption(sType, value);
      } else if (type === "array") {
        isType = value instanceof Array && isParseSimpleOption(arrayType);
        if (isType) {
          value.forEach((valueItem) => {
            const sType = arrayType as IParseSimpleType;
            isType = isType && parseSimpleOption(sType, valueItem);
          });
        }
      } else {
        isType = false;
      }
      if (value === undefined && required) {
        throw new ParseOptionsError(`${argName}.${name} not defined`);
      } else if (value !== undefined && !isType) {
        throw new ParseOptionsError(`${argName}.${name} not ${type}`);
      } else if (value !== undefined) {
        ret[name] = arg[name];
      }
    });
    const argKeys = Object.keys(arg);
    const retKeys = Object.keys(ret);
    if (retKeys.length === argKeys.length) {
      return ret;
    } else {
      if (parserOption === "remove_extra") {
        return ret;
      } else if (parserOption === "add_extra") {
        return arg;
      } else if (parserOption === "no_extra") {
        const extra = {};
        retKeys.forEach((key) => {
          const index = argKeys.indexOf(key);
          if (index !== -1) {
            argKeys.splice(index, 1);
          }
        });
        const extraKey = argKeys[0];
        throw new ParseOptionsError(`${argName} options not valid [${extraKey}]`);
      }
    }
  }
  public static getLogger(identifier: string) {
    Util.loadConfig();
    Util.checkEnvVariables(["LOG_LEVEL", "LOG_FILE", "LOG_FILE_TRACE"]);
    if (typeof identifier !== "string") {
      throw new Error("Bad log identifier");
    }
    if (!logContainer.has(identifier)) {

      const level = process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL;
      logContainer.add(identifier, {
        format: combine(
          label({
            label: identifier
          }),
          timestamp(),
          logFormat
        ),
        transports: [
          new winston.transports.Console({
            level
          }),
          new winston.transports.File({
            level,
            filename: path.resolve(process.env.LOG_FILE)
          }),
          new winston.transports.File({
            level: "silly",
            filename: path.resolve(process.env.LOG_FILE_TRACE)
          })
        ]
      });
    }
    return logContainer.get(identifier);
  }
  private static configLoaded: boolean = false;
}
