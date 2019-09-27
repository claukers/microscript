import * as cp from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as watch from "watch";

const usage = `usage: miqro watch [nodes=1] [mode=simple] <microservice.js>`;

const logger = console;

let nodes;
let modulePath;
let name;
let mode;

if (process.argv.length === 4) {
  mode = "simple";
  modulePath = process.argv[3];
  nodes = 1;
  name = path.basename(modulePath);
} else if (process.argv.length === 5) {
  mode = process.argv[3];
  modulePath = process.argv[4];
  nodes = 1;
  name = path.basename(modulePath);
} else if (process.argv.length === 6) {
  mode = process.argv[4];
  nodes = parseInt(process.argv[3], 10);
  modulePath = process.argv[5];
  name = path.basename(modulePath);
} else {
  logger.error(`missing args.`);
  throw new Error(usage);
}

if (isNaN(nodes)) {
  throw new Error(`<nodes> must be a number!\n${usage}`);
}
if (typeof mode !== "string") {
  throw new Error(`<mode> must be a string!\n${usage}`);
}
if (["cluster", "simple"].indexOf(mode) === -1) {
  throw new Error(`<mode> only can be a cluster or simple!\n${usage}`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!\n${usage}`);
}

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  throw new Error(`microservice [${service}] doesnt exists!`);
}

const serviceDirname = path.resolve(path.dirname(service));

let proc = null;

let restartTimeout = null;
const restart = (silent?) => {
  if (!silent) {
    logger.warn("restart queue");
  }
  clearTimeout(restartTimeout);
  restartTimeout = setTimeout(async () => {
    if (!silent) {
      logger.warn("restarting");
    }
    const start = () => {
      logger.log("running");
      proc = cp.spawn("npx", ["miqro", "start", nodes, mode, service], {
        cwd: serviceDirname,
        env: process.env,
        windowsHide: true
      });
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
      proc.on("close", (code) => {
        logger.log(`exited with code ${code}`);
        proc = null;
      });
    };
    if (proc) {
      let alive = false;
      try {
        proc.kill(0);
        alive = true;
      } catch (e) {
        logger.error(e);
      }
      proc.once("close", (code) => {
        start();
      });
      proc.kill("SIGINT");
      proc = null;
    } else {
      start();
    }
  }, silent ? 0 : 2000);
};
logger.log(`watching ${serviceDirname}`);
restart(true);
watch.watchTree(serviceDirname, (f, curr, prev) => {
  let ext = "";
  let basedir = "";
  let dirName = "";
  try {
    ext = path.extname(f);
    basedir = path.dirname(f);
    dirName = path.basename(basedir);
    if (dirName !== "logs" && ext !== ".log") {
      if (typeof f === "object" && prev === null && curr === null) {
        // Finished walking the tree
      } else if (prev === null) {
        // f is a new file
        logger.log(`${f} new file`);
        restart();
      } else if (curr.nlink === 0) {
        // f was removed
        logger.log(`${f} removed`);
        restart();
      } else {
        // f was changed
        logger.log(`change in ${f}`);
        restart();
      }
    }
  } catch (e) {
    ext = "";
    name = "";
    basedir = "";
  }

});
