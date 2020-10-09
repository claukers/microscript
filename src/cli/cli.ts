#!/usr/bin/env node
//@miqro/core
import {CLIUtil} from "@miqro/core";
import {main as init} from "@miqro/core/dist/cli/init";
import {main as config} from "@miqro/core/dist/cli/config";
import {main as configBash} from "@miqro/core/dist/cli/config-bash";
import {main as configEnv} from "@miqro/core/dist/cli/config-env";
//@miqro/runner
import {main as start} from "@miqro/runner/dist/cli/start";
import {main as startScript} from "@miqro/runner/dist/cli/start-script";
import {main as startApi} from "@miqro/runner/dist/cli/start-api";
import {main as watch} from "@miqro/runner/dist/cli/watch";
import {main as watchScript} from "@miqro/runner/dist/cli/watch-script";
import {main as version} from "@miqro/runner/dist/cli/version";

// noinspection SpellCheckingInspection
CLIUtil.cliFlow({
  ["init"]: {cb: init, description: "\tinits your config folder"},
  ["config"]: {cb: config, description: "\toutputs to stdout the config as a json"},
  ["config-bash"]: {
    cb: configBash,
    description: "outputs to stdout the config as a bash script"
  },
  ["config-env"]: {cb: configEnv, description: "outputs to stdout the config as a env file"},
  ["start"]: {cb: start, description: "\tstarts a microservice"},
  ["start-script"]: {cb: startScript, description: "starts a script"},
  ["start-api"]: {cb: startApi, description: "starts an apirouter on a directory"},
  ["watch"]: {cb: watch, description: "\tstarts a microservice in watch mode on the service dir"},
  ["watch-script"]: {cb: watchScript, description: "starts a script in watch mode on the script dir"},
  ["version"]: {cb: version, description: "\tprints miqro-runner version."}
}, "npx miqro <command> [args]", console);
