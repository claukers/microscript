const express = require("express");
const { Util, setupMiddleware } = require("../dist");
const path = require("path");

process.env.MIQRO_DIRNAME = path.resolve(__dirname);
Util.loadConfig();

const logger = Util.getLogger("main.js");
const service = require("./service.js");

const app = express();
setupMiddleware(app, logger);
service(app).then((server) => {
  server.listen(process.env.PORT);
}).catch((e) => {
  logger.error(e);
});
