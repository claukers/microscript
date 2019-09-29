const express = require("express");
const { Util, setupMiddleware } = require("miqro");
// process.env.MIQRO_DIRNAME must exists!
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
