import * as path from "path";
import * as child_process from "child_process";

const logger = console;

export const makemigrations = () => {
  const dbFolder = path.resolve(process.env.MICRO_DIRNAME, "db");
  const oldPWD = process.env.PWD;
  const oldCWD = process.cwd();
  process.chdir(dbFolder);
  process.env.PWD = dbFolder;
  /* tslint:disable */
  logger.log(child_process.execSync(
    'node ' + path.resolve(__dirname, '..', '..', 'node_modules', 'sequelize-auto-migrations', 'bin', 'makemigration.js').toString(),
    {
      env: process.env,
      windowsHide: true,

    }
  ).toString());
  /* tslint:enable */
  process.env.PWD = oldPWD;
  process.chdir(oldCWD);
}
