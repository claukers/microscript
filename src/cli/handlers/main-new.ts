import { ConfigPathResolver, Util } from "@miqro/core";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const templates = {
  ts:
    `import { App, checkEnvVariables, getLogger } from "@miqro/core";
import { APIRouter, middleware } from "@miqro/handlers";
import { resolve } from "path";

/*
To be start as a main file
node file.js
*/

const [PORT] = checkEnvVariables(["PORT"], ["8080"]);

const app = new App();
app.use(middleware());
const logger = getLogger("server");
app.use(APIRouter({
  dirname: resolve(__dirname, "api")
}));
app.listen(PORT, () => {
  logger.info("listening on " + PORT);
});
`,
  js:
    `const { App, checkEnvVariables, getLogger } = require("@miqro/core");
const { APIRouter, middleware } = require("@miqro/handlers");
const { resolve } = require("path");

/*
To be start as a main file
node file.js
*/

const [PORT] = checkEnvVariables(["PORT"], ["8080"]);

const app = new App();
app.use(middleware());
const logger = getLogger("server");
app.use(APIRouter({
  dirname: resolve(__dirname, "api")
}));
app.listen(PORT, () => {
  logger.info("listening on " + PORT);
});
`
}

export const main = (): void => {

  if (process.argv.length !== 4 || process.argv[3].length < 1) {
    throw new Error(`arguments: <identifier ex: SRC_MAIN>`);
  }

  const identifier = process.argv[3].toLocaleLowerCase();

  Util.getConfig();

  const split = identifier.split("_");

  const dots = split.filter(s => s.indexOf(".") !== -1);
  if (dots.length > 0) {
    throw new Error(`identifier cannot contain dots\narguments: <identifier ex: SRC_MAIN>`);
  }

  const path = resolve(ConfigPathResolver.getBaseDirname(), ...split.splice(0, split.length - 1));

  const ext = existsSync(resolve(ConfigPathResolver.getBaseDirname(), "tsconfig.json")) ? "ts" : "js";

  const filePath = resolve(path, `${split[0]}.${ext}`);
  if (existsSync(filePath)) {
    throw new Error(`file ${filePath} already exists! doing nothing`);
  }

  console.log(`creating ${filePath}`);

  mkdirSync(path, {
    recursive: true
  });

  writeFileSync(filePath, templates[ext]);
}
