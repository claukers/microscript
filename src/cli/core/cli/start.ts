import { Util } from "@miqro/core";
import { execSync } from "../../utils";

export const main = (): void => {

  if (process.argv.length <= 3) {
    throw new Error(`invalid number of args`);
  }

  Util.getConfig();

  execSync(`npx @miqro/runner ${process.argv.slice(3).join(" ")}`);
}

