import { Miqro } from "@miqro/runner";
import { startArgs } from "./startargs";

export const main = (): void => {
  const usage = `arguments: [nodes=1] [mode=simple] <microservice.js>`;

  const { nodes, mode, name, logger, service } = startArgs(usage);

  const micro = new Miqro({
    name,
    service,
    nodes,
    mode: mode as any
  });

  micro.start().catch((e) => {
    logger.error(e);
  });
}
