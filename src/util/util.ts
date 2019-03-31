import * as crypto from "crypto";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as winston from "winston";
import { ParseOptionsError } from "./error/";
import { winstonConfig } from "./loader";
import { templates } from "./templates";

const logContainer = new winston.Container();

const logger = console;

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
    Util.checkEnvVariables(["MIQRO_DIRNAME"]);
    const NODE_ENV = process.env.NODE_ENV || "development";
    process.env.NODE_ENV = NODE_ENV;
    const logsFolder = path.resolve(process.env.MIQRO_DIRNAME, "logs");
    process.env.LOG_FILE = path.resolve(logsFolder, `${process.env.NODE_ENV}.log`);
    process.env.LOG_FILE_TRACE = path.resolve(logsFolder, `${process.env.NODE_ENV}-trace.log`);
  }
  public static setupInstanceEnv(serviceName: string, scriptPath: string) {
    const microDirname = path.resolve(path.dirname(scriptPath));
    process.chdir(microDirname);
    if (!process.env.MIQRO_DIRNAME || process.env.MIQRO_DIRNAME === "undefined") {
      process.env.MIQRO_DIRNAME = microDirname;
    } else {
      logger.warn(`NOT changing to MIQRO_DIRNAME[${microDirname}] because already defined as ${process.env.MIQRO_DIRNAME}!`);
    }
    process.env.MICRO_NAME = serviceName;
    Util.setupSimpleEnv();
  }
  public static loadConfig(initEnv?: boolean) {
    Util.checkEnvVariables(["MIQRO_DIRNAME"]);
    if (!Util.configLoaded) {
      Util.setupSimpleEnv();
      const configFolder = path.resolve(process.env.MIQRO_DIRNAME, "config");
      const configPath = path.resolve(process.env.MIQRO_DIRNAME, "config", `${process.env.NODE_ENV}.env`);
      if (!fs.existsSync(configPath)) {
        if (!initEnv) {
          throw new Error(`[${configPath}] env file doesnt exists!`);
        } else {
          logger.warn(`[${configPath}] env file doesnt exists!`);
          if (!fs.existsSync(configFolder)) {
            fs.mkdirSync(configFolder);
          }
          logger.warn(`creating a new ${configPath} env file`);
          fs.writeFileSync(configPath, templates.defaultEnvFile);
        }
      } else {
        logger.log(`loading ${configPath}`);
      }
      config({
        path: configPath
      });
      const logsFolder = path.resolve(process.env.MIQRO_DIRNAME, "logs");
      const gitignorePath = path.resolve(process.env.MIQRO_DIRNAME, ".gitignore");
      const dbFolder = path.resolve(process.env.MIQRO_DIRNAME, "db");
      const migrationsFolder = path.resolve(dbFolder, "migrations");
      const modelsFolder = path.resolve(dbFolder, "models");
      const seedersFolder = path.resolve(dbFolder, "seeders");
      const sequelizercPath = path.resolve(process.env.MIQRO_DIRNAME, ".sequelizerc");
      const modelLoaderPath = path.resolve(modelsFolder, "index.js");
      const logjsPath = path.resolve(process.env.MIQRO_DIRNAME, "config", "log.js");
      const dbConfigFilePath = path.resolve(configFolder, "db.js");
      if (!fs.existsSync(gitignorePath)) {
        fs.writeFileSync(gitignorePath, templates.gitignore);
      }
      if (!fs.existsSync(configFolder)) {
        fs.mkdirSync(configFolder);
      }
      if (!fs.existsSync(logjsPath)) {
        fs.writeFileSync(logjsPath, templates.logjs);
      }
      if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
      }
      if (!fs.existsSync(dbFolder)) {
        fs.mkdirSync(dbFolder);
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
    if (typeof identifier !== "string") {
      throw new Error("Bad log identifier");
    }
    if (!logContainer.has(identifier)) {
      const configMaker = winstonConfig();
      const configO = configMaker(identifier);
      logContainer.add(identifier, configO);
    }
    const loggerO = logContainer.get(identifier);
    (loggerO as any).stream = {
      write: (message, encoding) => {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        loggerO.info(message.trim());
      }
    };
    return loggerO;
  }
  private static configLoaded: boolean = false;
}
