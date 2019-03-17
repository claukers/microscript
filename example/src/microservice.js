const { Database, Util } = require("../../dist");

const logger = Util.getLogger("microservice1.js");

module.exports = async (app) => {
  logger.info("hello world!");
  const db = Database.getInstance();
  await db.start();
  await db.stop();
};
