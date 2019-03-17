import * as crypto from "crypto";
import { ParseOptionsError } from "./error/";
import { config } from "dotenv";
import * as path from "path";
import * as fs from "fs";
import * as winston from 'winston';

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
const pid = process.pid;
const env = process.env.NODE_ENV;
const envString = pid;

const logFormat = printf((info) => {
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
  public static loadConfig() {
    Util.checkEnvVariables(["MICRO_CONFIG"]);
    if (!Util.configLoaded) {
      const NODE_ENV = process.env.NODE_ENV || "development";
      process.env.NODE_ENV = NODE_ENV;
      const configPath = path.resolve(process.env.MICRO_CONFIG, `${NODE_ENV}.env`);
      if (!fs.existsSync(configPath)) {
        throw new Error(`[${configPath}] env file doesnt exists!`);
      } else {
        console.log(`loading ${configPath}`);
      }
      config({
        path: configPath
      });
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

