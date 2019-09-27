import * as fs from "fs";
import * as path from "path";

const logger = console;

logger.info(JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "..", "package.json")).toString()).version);
