import * as morgan from "morgan";
import * as bodyParser from "body-parser";

export const setupMiddleware = async (app, logger) => {
  app.use(morgan("combined", { stream: logger.stream }));
  app.use(bodyParser.json());
};
