import { ConfigPathResolver } from "@miqro/core";
import { traverseAPIRouteDir } from "@miqro/handlers";
import { resolve, basename } from "path";


import { Util } from "@miqro/core";
import { getDOCJSON } from "../util";

export const main = (): void => {
  const logger = console;

  if (process.argv.length !== 5) {
    throw new Error(`arguments: <api_folder> <subPath>`);
  }

  const dirname = process.argv[3];
  const subPath = process.argv[4];

  Util.getConfig();

  logger.info(JSON.stringify(getDOCJSON({ dirname, subPath }, logger as any), undefined, 2));
}
