import {Util} from "@miqro/core";
import {seed} from "../db";

export const main = (): void => {
  if (process.argv.length !== 3) {
    throw new Error(`invalid number of args`);
  }

  Util.loadConfig();
  seed();
}
