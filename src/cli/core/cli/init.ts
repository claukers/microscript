import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { ConfigPathResolver } from "@miqro/core";
import { templates } from "../templates";

export const main = (): void => {
  const logger = console;

  if (process.argv.length !== 3) {
    throw new Error(`invalid number of args`);
  }

  const configPath = ConfigPathResolver.getConfigDirname();
  if (!existsSync(configPath)) {
    logger.warn(`[${configPath}] doesnt exists!`);
    mkdirSync(configPath, {
      recursive: true
    });

    const initEnvFile = (path: string, template: string): void => {
      if (!existsSync(path)) {
        logger.warn(`creating ${path} env file`);
        writeFileSync(path, template);
      } else {
        logger.warn(`${path} already exists!. init will not create it.`);
      }
    };
    initEnvFile(resolve(configPath, `log.env`), templates.logEnvFile);
    initEnvFile(resolve(configPath, `db.env`), templates.dbEnvFile);
    initEnvFile(resolve(configPath, `auth.env`), templates.authEnvFile);
    initEnvFile(resolve(configPath, `http.env`), templates.httpEnvFile);
    initEnvFile(resolve(configPath, `features.env`), templates.featuresEnvFile);
  }
}
