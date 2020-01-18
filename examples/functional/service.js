const {
  Util,
  ParseOptionsError
} = require("miqro-core");
const {
  SessionHandler,
  GroupPolicyHandler,
  Handler,
  ErrorHandler,
  ResponseHandler,
} = require("miqro-express");
const {Router} = require("express");
const path = require("path");

// curl --header "Authorization: token" localhost:8080/api/v0/sum/1/2/3
// TO GET A RANDOM AUTH ERROR
// curl --header "Authorization: othertoken" localhost:8080/api/v0/sum/1/2/3
// TO GET A 400
// curl --header "Authorization: token" localhost:8080/api/v0/sum/1/b/3

module.exports = async (app) => {
  const api = Router();
  const logger = Util.getLogger("myapp");
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
    SessionHandler({
      verify: async ({token}) => {
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
    }),
    GroupPolicyHandler({
      groups: [[1, 2], 5],
      groupPolicy: "at_least_one"
    }),
    Handler(parse("params", "a"), logger),
    Handler(parse("params", "b"), logger),
    Handler(parse("params", "c"), logger),
    Handler(async ({results}) => {
      logger.info(results);
      const reduced = results.reduce((total, num) => total + num);
      logger.info(reduced);
      results.splice(0, results.length);
      return reduced;
    }, logger),
    ResponseHandler(logger)
  ]);
  api.use(ErrorHandler(logger));
  app.use("/api/v0", api);
  logger.info("up");
  return app;
};
