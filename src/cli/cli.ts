#!/usr/bin/env node
//@miqro/core
import { CLIUtil } from "@miqro/core";
import { main as apiDocJSON } from "./doc/cli/json";
import { main as apiDocMD } from "./doc/cli/md";
import { main as configInit } from "./core/cli/config-init";
import { main as config } from "./core/cli/config";
import { main as configBash } from "./core/cli/config-bash";
import { main as configEnv } from "./core/cli/config-env";
//@miqro/database
import { main as dbInit } from "./database/cli/init";
import { main as makeMigrations } from "./database/cli/makemigrations";
import { main as migrate } from "./database/cli/migrate";
import { main as consoleCMD } from "./database/cli/console";
import { main as autoMigrate } from "./database/cli/automigrate";
import { main as seedAll } from "./database/cli/seed-all";
import { main as seed } from "./database/cli/seed";
import { main as undoSeedAll } from "./database/cli/undo-seed-all";
import { main as undoSeed } from "./database/cli/undo-seed";
import { main as migrationStatus } from "./database/cli/migration-status";
import { main as createModel } from "./database/cli/createmodel";
import { main as pushData } from "./database/cli/push-data";
import { main as dumpData } from "./database/cli/dump-data";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  ["doc"]: { cb: apiDocJSON, description: "\t\toutputs to stdout an api folder auto doc as a json" },
  ["doc:md"]: { cb: apiDocMD, description: "\t\toutputs to a file an api folder auto doc as a markdown" },
  ["config"]: { cb: config, description: "\t\toutputs to stdout the config as a json" },
  ["config:bash"]: {
    cb: configBash,
    description: "\toutputs to stdout the config as a bash script"
  },
  ["config:env"]: { cb: configEnv, description: "\toutputs to stdout the config as a env file" },
  ["config:init"]: { cb: configInit, description: "\tinits your config folder" },

  ["db:console"]: { cb: consoleCMD, description: "\truns a readline interface that send the input as a query" },
  ["db:dump:data"]: { cb: dumpData, description: "\tdump the data of the database (only defined models)" },
  ["db:push:data"]: { cb: pushData, description: "\tpush a dump to the database" },
  ["db:automigrate"]: { cb: autoMigrate, description: "\truns makemigrations and migrate together" },
  ["db:makemigration"]: {
    cb: makeMigrations,
    description: "seeks changes in your models and creates migrations"
  },
  ["db:migrate:status"]: { cb: migrationStatus, description: "npx sequelize-cli db:migrate:status" },
  ["db:migrate"]: { cb: migrate, description: "\tnpx sequelize-cli db:migrate" },
  ["db:seed:all"]: { cb: seedAll, description: "\tnpx sequelize-cli db:seed:all" },
  ["db:seed"]: { cb: seed, description: "\tnpx sequelize-cli db:seed" },
  ["db:seed:undo:all"]: { cb: undoSeedAll, description: "npx sequelize-cli db:seed:undo:all" },
  ["db:seed:undo"]: { cb: undoSeed, description: "\tnpx sequelize-cli db:seed:undo" },
  ["db:create:model"]: { cb: createModel, description: "\tcreates an example model" },
  ["db:init"]: { cb: dbInit, description: "\t\tinit sequelize configuration." }
}, "npx miqro <command> [args]", console);
