import * as path from "path";
import { runInstance, setupInstance } from "./util/loader";

const serviceName = process.argv[process.argv.length - 2];
const scriptPath = path.resolve(process.argv[process.argv.length - 1]);
const { script, logger } = setupInstance(serviceName, scriptPath);
runInstance(logger, script, scriptPath).catch((e) => {
  logger.error(e);
});
