'use strict';

import * as fs from 'fs';
import * as  path from 'path';
import * as  Sequelize from 'sequelize';
import { Util } from '../util';

export const setupDB = () => {
  Util.checkEnvVariables(["DB_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_DIALECT",
    "DB_OPERATORSALIASES", "DB_POOL_MAX", "DB_POOL_MIN", "DB_POOL_ACQUIRE", "DB_POOL_IDDLE", "DB_STORAGE"
  ]);

  const modelsPath = path.resolve(path.dirname(process.env.MICRO_CONFIG), 'db', 'models');

  const config = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "operatorsAliases": process.env.DB_OPERATORSALIASES !== "false",
    "pool": {
      "acquire": parseInt(process.env.DB_POOL_ACQUIRE, 10),
      "idle": parseInt(process.env.DB_POOL_IDDLE, 10),
      "max": parseInt(process.env.DB_POOL_MAX, 10),
      "min": parseInt(process.env.DB_POOL_MIN, 10)
    },
    "storage": process.env.DB_STORAGE,
    "logging": Util.getLogger("Sequelize").info
  };

  const db: {
    sequelize: any;
    Sequelize: any;
  } = {
    sequelize: new Sequelize(config.database, config.username, config.password, config),
    Sequelize
  };

  fs
    .readdirSync(modelsPath)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = db.sequelize['import'](path.join(modelsPath, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  return db;
};