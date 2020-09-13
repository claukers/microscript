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
import {main as version} from "@miqro/runner/dist/cli/version";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  ["core:init"]: {cb: init, description: "\tinits your config folder"},
  ["core:config"]: {cb: config, description: "\toutputs to stdout the config as a json"},
  ["core:config-bash"]: {
    cb: configBash,
    description: "outputs to stdout the config as a bash script"
  },
  ["core:config-env"]: {cb: configEnv, description: "outputs to stdout the config as a env file"},
  ["db:init"]: {cb: dbInit, description: "init sequelize configuration."},
  ["db:makemigrations"]: {
    cb: makeMigrations,
    description: "seeks changes in your models and creates migrations"
  },
  ["db:console"]: {cb: consoleCMD, description: "runs a readline interface that send the input as a query"},
  ["db:migrate"]: {cb: migrate, description: "runs the migrations"},
  ["db:automigrate"]: {cb: autoMigrate, description: "runs makemigrations and migrate together"},
  ["db:seed"]: {cb: seed, description: "seeds your db"},
  ["db:undo-seed"]: {cb: undoSeed, description: "undo all seeds from your db"},
  ["db:migration-status"]: {cb: migrationStatus, description: "..."},
  ["db:createmodel"]: {cb: createModel, description: "creates an example model"},

  ["runner:start"]: {cb: start, description: "\tstarts a microservice"},
  ["runner:start-script"]: {cb: startScript, description: "starts a script"},
  ["runner:start-api"]: {cb: startApi, description: "starts an apirouter on a directory"},
  ["runner:watch"]: {cb: watch, description: "\tstarts a microservice in watch mode on the service dir"},
  ["runner:watch-script"]: {cb: watchScript, description: "starts a script in watch mode on the script dir"},
  ["runner:version"]: {cb: version, description: "\tprints miqro-runner version."}
}, "miqro-core", console);
