import * as path from "path";
import { Util } from "./util";

const serviceName = process.argv[3];
const scriptPath = path.resolve(process.argv[4]);
process.chdir(path.resolve(path.dirname(scriptPath)));
const configPath = path.resolve(path.dirname(scriptPath), 'config');
const sequelizerc = path.resolve(path.dirname(scriptPath), '.sequelizerc');

process.env["MICRO_CONFIG"] = configPath;
process.env["SEQUELIZERC"] = sequelizerc;
process.env["MICRO_NAME"] = serviceName;

Util.loadConfig();

const logger = Util.getLogger(`${serviceName}`);

logger.debug("config loaded!");

logger.info(`loading script [${scriptPath}]!`);
const script = require(scriptPath);

logger.debug(`setting up express`);
// TODO create and setup express
const app = null;

logger.debug(`launching script [${scriptPath}]`);
script(app).catch((e) => {
  logger.error(e);
});

logger.debug(`started`);
