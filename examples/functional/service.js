const {
  Util,
  ParseOptionsError
} = require("miqro-core");
const {
  APIRoute,
  createSessionHandler,
  createGroupPolicyHandler,
  createMethodHandler,
  createServiceResponseHandler,
} = require("miqro-express");
const path = require("path");

// curl --header "Authorization: token" localhost:8080/sum/1/2/3
// TO GET A RANDOM AUTH ERROR
// curl --header "Authorization: othertoken" localhost:8080/sum/1/2/3
// TO GET A 400
// curl --header "Authorization: token" localhost:8080/sum/1/b/3

module.exports = async (app) => {
  const api = new APIRoute({
    name: "API V0"
  });
  const parse = (attr, key) => {
    return async (args) => {
      const data = args && args[attr] ? args[attr][key] : null;
      if (isNaN(data)) {
        throw new ParseOptionsError(`${attr}.${key} not a number!`);
      }
      return parseInt(data);
    }
  };

  api.get("/sum/:a/:b/:c", [
    createSessionHandler({
      verify: async ({ token }) => {
        return token === "token" ? { // token token get the correct groups only
          account: "a",
          username: "u",
          groups: [1, 2, 3],
          token: "t"
        } : (Math.random() > 0.5 ? { // other token's get random 401 or 403 xD
          account: "a",
          username: "u",
          groups: [1, 3],
          token: "t"
        } : null);
      }
    }, api.logger),
    createGroupPolicyHandler({
      groups: [[1, 2], 5],
      groupPolicy: "at_leats_one"
    }, api.logger),
    createMethodHandler(parse("params", "a"), api.logger),
    createMethodHandler(parse("params", "b"), api.logger),
    createMethodHandler(parse("params", "c"), api.logger),
    createMethodHandler(async ({ results }) => {
      api.logger.info(results);
      const reduced = results.reduce((total, num) => total + num);
      api.logger.info(reduced);
      results.splice(0, results.length);
      return reduced;
    }, api.logger),
    createServiceResponseHandler()
  ]);
  app.use("/api/v0", api.routes());
  api.logger.info("up");
  return app;
};
