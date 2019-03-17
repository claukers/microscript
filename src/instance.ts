import * as path from "path";
import { Util } from "./util";

const NODE_ENV = process.env.NODE_ENV || "development";
const serviceName = process.argv[3];
const scriptPath = path.resolve(process.argv[4]);
const configPath = path.resolve(path.dirname(scriptPath), '..', 'config');
const microDirname = path.resolve(path.dirname(scriptPath), '..');
const logsFolder = path.resolve(microDirname, "logs");

process.chdir(microDirname);

process.env["NODE_ENV"] = NODE_ENV;
process.env["MICRO_CONFIG"] = configPath;
process.env["MICRO_DIRNAME"] = microDirname;
process.env["MICRO_NAME"] = serviceName;
process.env["LOG_FILE"] = path.resolve(logsFolder, `${process.env.NODE_ENV}.log`);
process.env["LOG_FILE_TRACE"] = path.resolve(logsFolder, `${process.env.NODE_ENV}-trace.log`);

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
