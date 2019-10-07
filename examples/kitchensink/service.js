const {
  createServiceHandler,
  APIRoute
} = require("miqro-express");
const {
  Util,
  ParseOptionsError
} = require("miqro-core");
const {
  Database,
  ModelService
} = require("miqro-sequelize");
const {
  ModelRoute,
} = require("miqro-sequelize-express");

const logger = Util.getLogger("posts.js");
const db = Database.getInstance();

class MyCustomService {
  async myFunction(args) {
    throw new ParseOptionsError(`my request error.`);
  }
}

module.exports = async (app) => {
  /*
  * GET /post/
  * GET /post/:id
  * PATCH /post/:id
  * POST /post/
  * 
  * for model db.models.post
  * to allow delete add it to the allowedMethods list
  */
  const api = new APIRoute();
  api.use("/post",
    new ModelRoute(
      new ModelService(
        db.models.post
      ),
      {
        allowedMethods: ["GET", "POST", "PATCH"]
      }).routes());
  api.use("/myFunction", createServiceHandler(new MyCustomService(), "myFunction"));
  app.use("/api", api.routes());
  return app;
};
