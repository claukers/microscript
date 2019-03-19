"use strict";

import * as  path from "path";

export const setupDB = () => {
  const sequelizerc = require(path.resolve(process.env.MICRO_DIRNAME, ".sequelizerc"));
  return require(sequelizerc["models-path"]);
};
