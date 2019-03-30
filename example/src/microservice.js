const {
  Database,
  Util,
  ModelService,
  ProtectedRoute,
  ModelRoute,
  APIResponse
} = require("../../dist");

const logger = Util.getLogger("microservice.js");
const db = Database.getInstance();

module.exports = async (app) => {

  // JWT Protected api
  const api = new ProtectedRoute();
  // GET /api/v1/version
  api.get("/version", async (req, res) => {
    await new APIResponse({
      version: 1
    }).send(res);
  });
  // GET/POST/PATCH/DELETE /api/v1/post
  api.use("/post", new ModelRoute(new ModelService(db.models.post)).routes());

  // attach api to app
  app.use("/api/v1", api.routes());

  // un protected route
  // GET /post ( only GET method allowed )
  app.use("/public/post", new ModelRoute(new ModelService(db.models.post), {
    allowedMethods: ["GET"]
  }).routes());

  logger.info("app init done");

  return app;
};
