import * as path from "path";
import { Util } from "./util";

const serviceName = process.argv[3];
const scriptPath = path.resolve(process.argv[4]);
Util.setupInstanceEnv(serviceName, scriptPath);
Util.loadConfig();

const logger = Util.getLogger(`${serviceName}`);

logger.info(`config loaded [${process.env.MICRO_DIRNAME}]!`);

logger.info(`loading script [${scriptPath}]!`);
/* tslint:disable */
const script = require(scriptPath);
/* tslint:enable */

logger.debug(`setting up express`);
// TODO create and setup express
const app = null;

logger.debug(`launching script [${scriptPath}]`);
script(app).catch((e) => {
  logger.error(e);
  logger.error(e.stack);
});

logger.debug(`started`);
