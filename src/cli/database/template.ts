// noinspection SpellCheckingInspection
const modelsIndex =
  `'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sequelizerc = require(path.resolve(__dirname, '..', '..', '.sequelizerc'));
const config = require(sequelizerc.config);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

`;
// noinspection SpellCheckingInspection
const dbConfig =
  `["DB_DIALECT_SSL", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASS", "DB_HOST", ` +
  `"DB_DIALECT", "DB_POOL_MAX", "DB_POOL_MIN", "DB_POOL_ACQUIRE", "DB_POOL_IDDLE", "DB_STORAGE"].forEach((envName) => {
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
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: process.env.DB_DIALECT_SSL === "true"
  },
  pool: {
    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10),
    idle: parseInt(process.env.DB_POOL_IDDLE, 10),
    max: parseInt(process.env.DB_POOL_MAX, 10),
    min: parseInt(process.env.DB_POOL_MIN, 10)
  },
  storage: process.env.DB_STORAGE
};
`;
// noinspection SpellCheckingInspection
const sequelizerc =
  `const path = require("path");

module.exports = {
  "config": path.resolve(__dirname, "db", "connection.js"),
  "migrations-path": path.resolve(__dirname, "db", "migrations"),
  "seeders-path": path.resolve(__dirname, "db", "seeders"),
  "models-path": path.resolve(__dirname, "db", "models"),
};
`;

const exampleModel = (modelName: string): string => {
  return `module.exports = (sequelize, DataTypes) => {
  const ${modelName} = sequelize.define("${modelName}", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  ${modelName}.associate = function(models) {
    // associations can be defined here
    // ${modelName}.belongsTo(models.....)
  };
  return ${modelName};
};`;
};

// noinspection SpellCheckingInspection
export const templates = {
  modelsIndex,
  dbConfig,
  sequelizerc,
  exampleModel
};
