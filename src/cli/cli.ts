#!/usr/bin/env node
//@miqro/core
import { CLIUtil } from "@miqro/core";
import { main as init } from "./core/cli/init";
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
import { main as undoSeed } from "./database/cli/undo-seed";
import { main as migrationStatus } from "./database/cli/migration-status";
import { main as createModel } from "./database/cli/createmodel";
import { main as pushData } from "./database/cli/push-data";
import { main as dumpData } from "./database/cli/dump-data";
//@miqro/runner
import { main as start } from "./runner/cli/start";
import { main as startScript } from "./runner/cli/start-script";
import { main as startApi } from "./runner/cli/start-api";
import { main as watch } from "./runner/cli/watch";
import { main as watchScript } from "./runner/cli/watch-script";
import { main as watchApi } from "./runner/cli/watch-api";
import { main as version } from "./runner/cli/version";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  ["config:init"]: { cb: init, description: "\t\tinits your config folder" },
  ["config"]: { cb: config, description: "\t\toutputs to stdout the config as a json" },
  ["config:bash"]: {
    cb: configBash,
    description: "\toutputs to stdout the config as a bash script"
  },
  ["config:env"]: { cb: configEnv, description: "\toutputs to stdout the config as a env file" },


  ["db:init"]: { cb: dbInit, description: "\t\tinit sequelize configuration." },
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
  ["db:seed:undo:all"]: { cb: undoSeed, description: "npx sequelize-cli db:seed:undo:all" },
  ["db:create:model"]: { cb: createModel, description: "\tcreates an example model" },

  ["start"]: { cb: start, description: "\t\tstarts a microservice" },
  ["start:script"]: { cb: startScript, description: "\tstarts a script" },
  ["start:api"]: { cb: startApi, description: "\tstarts an apirouter on a directory" },
  ["watch"]: { cb: watch, description: "\t\tstarts a microservice in watch mode on the service dir" },
  ["watch:script"]: { cb: watchScript, description: "\tstarts a script in watch mode on the script dir" },
  ["watch:api"]: { cb: watchApi, description: "\tstarts a apirouter on a directory in watch mode on the dir" },
  ["version"]: { cb: version, description: "\t\tprints miqro-runner version." }
}, "npx miqro <command> [args]", console);
