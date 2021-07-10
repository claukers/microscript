import { ConfigPathResolver, GroupPolicy, Logger, ParseOptions } from "@miqro/core";
import { basename, resolve } from "path";
import { checkModule } from "../utils";

export const getDOCJSON = ({ dirname, subPath }: { dirname: string; subPath: string; }, logger: Logger): {
  path: string;
  methods: string[];
  identifier: string;
  description: string;
  params: false | ParseOptions | ParseOptions[];
  query: false | ParseOptions | ParseOptions[];
  body: false | ParseOptions | ParseOptions[];
  policy: GroupPolicy;
  results: ParseOptions | ParseOptions[];
  featureName: string;
}[] => {
  const { traverseAPIRouteDir } = checkModule("@miqro/handlers");
  const apiTraverse = traverseAPIRouteDir(logger, basename(dirname).toUpperCase(), resolve(ConfigPathResolver.getBaseDirname(), dirname), subPath);
  const docJSON = Object.keys(apiTraverse.features).map(featureName => {
    const { path, methods, identifier, apiHandlerOptions } = apiTraverse.features[featureName];
    const { params, description, query, body, policy, results } = apiHandlerOptions;
    return {
      path, methods, identifier,
      params,
      description, query, body, policy, results,
      featureName
    };
  });
  return docJSON;
}
