const {
  ModelRoute,
  ModelService,
  Database,
  Util,
  createServiceAPIHandler,
  ParseOptionsError,
} = require("miqro");

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
  app.use("/post",
    new ModelRoute(
      new ModelService(
        db.models.post
      ),
      {
        allowedMethods: ["GET", "POST", "PATCH"]
      }).routes());
  app.use("/myFunction", createServiceAPIHandler(new MyCustomService(), "myFunction"));
  return app;
};
