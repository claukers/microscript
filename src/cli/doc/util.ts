import { ConfigPathResolver, GroupPolicy, Logger } from "@miqro/core";
import { ParseOptions, traverseAPIRouteDir } from "@miqro/handlers";
import { basename, resolve } from "path";

export const getDOCJSON = ({ dirname, subPath }: { dirname: string; subPath: string; }, logger: Logger): {
  path: string;
  methods: string[];
  identifier: string;
  description: string;
  query: false | ParseOptions | ParseOptions[];
  body: false | ParseOptions | ParseOptions[];
  policy: GroupPolicy;
  results: ParseOptions | ParseOptions[];
  featureName: string;
}[] => {
  const apiTraverse = traverseAPIRouteDir(logger, basename(dirname).toUpperCase(), resolve(ConfigPathResolver.getBaseDirname(), dirname), subPath);
  const docJSON = Object.keys(apiTraverse.features).map(featureName => {
    const { path, methods, identifier, apiHandlerOptions } = apiTraverse.features[featureName];
    const { description, query, body, policy, results } = apiHandlerOptions;
    return {
      path, methods, identifier,
      description, query, body, policy, results,
      featureName
    };
  });
  return docJSON;
}
