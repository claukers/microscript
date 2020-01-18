const {
  Database,
  ModelService
} = require("miqro-sequelize");
const {
  ModelRouter,
} = require("miqro-sequelize-express");
const {Router} = require("express");

const db = Database.getInstance();

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
  const api = Router();
  api.use("/post",
    ModelRouter(
      new ModelService(
        db.models.post
      )
    )
  );
  app.use("/api", api);
  return app;
};
