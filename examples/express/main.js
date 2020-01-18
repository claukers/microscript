const express = require("express");
const {Util} = require("miqro-core");
const {setupMiddleware} = require("miqro-express");
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
