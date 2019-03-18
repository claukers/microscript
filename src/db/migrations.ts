import * as child_process from "child_process";
import * as path from "path";

const logger = console;

export const makemigrations = () => {
  try {
    const dbFolder = path.resolve(process.env.MICRO_DIRNAME, "db");
    logger.log(child_process.execSync(
      "npx makemigration",
      {
        cwd: dbFolder,
        env: process.env,
        windowsHide: true

      }
    ).toString());
  } catch (e) {
    logger.error(e.message);
  }
};

export const migrate = () => {
  try {
    const dbFolder = path.resolve(process.env.MICRO_DIRNAME);
    logger.log(child_process.execSync(
      "npx sequelize db:migrate",
      {
        cwd: dbFolder,
        env: process.env,
        windowsHide: true
      }
    ).toString());
  } catch (e) {
    logger.error(e.message);
  }
};

export const seed = () => {
  try {
    const dbFolder = path.resolve(process.env.MICRO_DIRNAME);
    logger.log(child_process.execSync(
      "npx sequelize db:seed:all",
      {
        cwd: dbFolder,
        env: process.env,
        windowsHide: true
      }
      ).toString());
  } catch (e) {
    logger.error(e.message);
  }
};
