import { Util } from "@miqro/core";

export const main = (): void => {
  const logger = console;

  if (process.argv.length !== 3) {
    throw new Error(`invalid number of args`);
  }

  const configOut = Util.getConfig();

  const config = configOut.combined;

  logger.info(JSON.stringify(config, undefined, 2));
}

