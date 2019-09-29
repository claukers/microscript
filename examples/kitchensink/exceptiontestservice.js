const {
  Database,
  Util,
  createServiceAPIHandler,
  ParseOptionsError,
  ServiceRoute,
  createServiceHandler,
  createAPIHandler,
  Route
} = require("miqro");

const logger = Util.getLogger("exception test service");
const db = Database.getInstance();

const myFunctionImpl = async () => {
  throw new ParseOptionsError(`my request error.`);
};

class MyCustomService {
  async myFunction() {
    await myFunctionImpl();
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

  // Using ServiceRoute all exceptions are catched and interpreted
  const api = new ServiceRoute();
  // curl localhost:8080/noprotection/myFunctionProtected
  api.use("/myFunction", createServiceHandler(new MyCustomService(), "myFunction"));
  // curl localhost:8080/api/myFunctionSimple
  api.use("/myFunctionSimple", myFunctionImpl);
  app.use("/api", api.routes());

  // Using Route NO exception is handled without createServiceAPIHandler or createAPIHandler
  const route = new Route();
  // curl localhost:8080/noprotection/myFunctionProtected
  route.use("/myFunctionProtected", createServiceAPIHandler(new MyCustomService(), "myFunction"));
  // this will crash the server
  // curl localhost:8080/noprotection/myFunction
  route.use("/myFunction", createServiceHandler(new MyCustomService(), "myFunction"));
  // curl localhost:8080/noprotection/myFunctionSimpleProtected
  route.use("/myFunctionSimpleProtected", createAPIHandler(myFunctionImpl));
  // this will crash the server
  // curl localhost:8080/noprotection/myFunctionSimple
  route.use("/myFunctionSimple", myFunctionImpl);
  app.use("/noprotection", route.routes());

  // Using express app directly or router NO exception is handled without createServiceAPIHandler or createAPIHandler
  // curl localhost:8080/myFunctionProtected
  app.use("/myFunctionProtected", createServiceAPIHandler(new MyCustomService(), "myFunction"));
  // this will crash the server
  // curl localhost:8080/myFunction
  app.use("/myFunction", createServiceHandler(new MyCustomService(), "myFunction"));
  // curl localhost:8080/myFunctionProtected
  app.use("/myFunctionSimpleProtected", createAPIHandler(myFunctionImpl));
  // this will crash the server
  // curl localhost:8080/myFunction
  app.use("/myFunctionSimple", myFunctionImpl);
  return app;
};
