#!/usr/bin/env node
//@miqro/core
import {CLIUtil} from "@miqro/core";
import {main as init} from "@miqro/core/dist/cli/init";
import {main as config} from "@miqro/core/dist/cli/config";
import {main as configBash} from "@miqro/core/dist/cli/config-bash";
import {main as configEnv} from "@miqro/core/dist/cli/config-env";
//@miqro/database
import {main as dbInit} from "@miqro/database/dist/cli/init";
import {main as makeMigrations} from "@miqro/database/dist/cli/makemigrations";
import {main as migrate} from "@miqro/database/dist/cli/migrate";
import {main as consoleCMD} from "@miqro/database/dist/cli/console";
import {main as autoMigrate} from "@miqro/database/dist/cli/automigrate";
import {main as seed} from "@miqro/database/dist/cli/seed";
import {main as undoSeed} from "@miqro/database/dist/cli/undo-seed";
import {main as migrationStatus} from "@miqro/database/dist/cli/migration-status";
import {main as createModel} from "@miqro/database/dist/cli/createmodel";
//@miqro/runner
import {main as start} from "@miqro/runner/dist/cli/start";
import {main as startScript} from "@miqro/runner/dist/cli/start-script";
import {main as startApi} from "@miqro/runner/dist/cli/start-api";
import {main as watch} from "@miqro/runner/dist/cli/watch";
import {main as watchScript} from "@miqro/runner/dist/cli/watch-script";
import {main as watchApi} from "@miqro/runner/dist/cli/watch-api";
import {main as version} from "@miqro/runner/dist/cli/version";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  ["init"]: {cb: init, description: "\t\tinits your config folder"},
  ["config"]: {cb: config, description: "\t\toutputs to stdout the config as a json"},
  ["config-bash"]: {
    cb: configBash,
    description: "\toutputs to stdout the config as a bash script"
  },
  ["config-env"]: {cb: configEnv, description: "\toutputs to stdout the config as a env file"},
  ["db:init"]: {cb: dbInit, description: "\t\tinit sequelize configuration."},
  ["db:makemigrations"]: {
    cb: makeMigrations,
    description: "seeks changes in your models and creates migrations"
  },
  ["db:console"]: {cb: consoleCMD, description: "\truns a readline interface that send the input as a query"},
  ["db:migrate"]: {cb: migrate, description: "\truns the migrations"},
  ["db:automigrate"]: {cb: autoMigrate, description: "\truns makemigrations and migrate together"},
  ["db:seed"]: {cb: seed, description: "\t\tseeds your db"},
  ["db:undo-seed"]: {cb: undoSeed, description: "\tundo all seeds from your db"},
  ["db:migration-status"]: {cb: migrationStatus, description: "..."},
  ["db:createmodel"]: {cb: createModel, description: "\tcreates an example model"},

  ["start"]: {cb: start, description: "\t\tstarts a microservice"},
  ["start-script"]: {cb: startScript, description: "\tstarts a script"},
  ["start-api"]: {cb: startApi, description: "\tstarts an apirouter on a directory"},
  ["watch"]: {cb: watch, description: "\t\tstarts a microservice in watch mode on the service dir"},
  ["watch-script"]: {cb: watchScript, description: "\tstarts a script in watch mode on the script dir"},
  ["watch-api"]: {cb: watchApi, description: "\tstarts a apirouter on a directory in watch mode on the dir"},
  ["version"]: {cb: version, description: "\t\tprints miqro-runner version."}
}, "npx miqro <command> [args]", console);
