const {
  Database,
  Util,
  ModelService,
  ModelServiceRoute
} = require("../../dist");

const logger = Util.getLogger("microservice.js");
const db = Database.getInstance();

module.exports = async (app) => {
  logger.info("hello world!");
  app.use("/post", new ModelServiceRoute(new ModelService(db.models.post)).routes());
  return app;
};
