import * as lib from "..";
import * as path from "path";
import * as fs from "fs";

const name = process.argv[3];
const modulePath = process.argv[4];

if (typeof name !== "string") {
  throw new Error(`usage: microscript start <name> <microservice.js>`);
}
if (typeof modulePath !== "string" || process.argv.length !== 5) {
  throw new Error(`usage: microscript start <name> <microservice.js>`);
}

const service = path.resolve(modulePath);

if (!fs.existsSync(service)) {
  throw new Error(`microservice [${service}] doesnt exists!`);
}

const micro = new lib.Micro({
  name: "Micro 1",
  service,
  nodes: 1
});

micro.start().catch((e) => {
  console.error(e);
});
