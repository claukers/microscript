import * as morgan from "morgan";

export const setupMiddleware = async (app, logger) => {
  app.use(morgan("combined", { stream: logger.stream }));
};
