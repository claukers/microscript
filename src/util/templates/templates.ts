const modelsIndex =
`'use strict';

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
`;
const dbConfig =
`["DB_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_DIALECT",
"DB_OPERATORSALIASES", "DB_POOL_MAX", "DB_POOL_MIN", "DB_POOL_ACQUIRE", "DB_POOL_IDDLE", "DB_STORAGE"
].forEach((envName) => {
if (process.env[envName] === undefined) {
  throw new Error(\`Env variable [\${envName}!] not defined\`);
}
});

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: process.env.DB_OPERATORSALIASES !== "false",
  pool: {
    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10),
    idle: parseInt(process.env.DB_POOL_IDDLE, 10),
    max: parseInt(process.env.DB_POOL_MAX, 10),
    min: parseInt(process.env.DB_POOL_MIN, 10)
  },
  storage: process.env.DB_STORAGE
};
`;

const sequelizerc =
`const path = require("path");

module.exports = {
  "config": path.resolve(__dirname, "db", "config", "index.js"),
  "migrations-path": path.resolve(__dirname, "db", "migrations"),
  "seeders-path": path.resolve(__dirname, "db", "seeders"),
  "models-path": path.resolve(__dirname, "db", "models"),
};
`;

export const templates = {
  modelsIndex,
  dbConfig,
  sequelizerc
};
