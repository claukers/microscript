'use strict';

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelizerc = require(path.resolve(__dirname, '..', '..', '.sequelizerc'));
const config = require(sequelizerc.config);

const modelsPath = __dirname;


const db = {
  sequelize: new Sequelize(config.database, config.username, config.password, config),
  Sequelize
};

fs
  .readdirSync(modelsPath)
  .filter((file) => {
    return (file !== "index.js") && (file.indexOf(".") !== 0) && (file.slice(-3) === ".js");
  })
  .forEach((file) => {
    const model = db.sequelize.import(path.join(modelsPath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;
