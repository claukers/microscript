import { ConfigPathResolver, GroupPolicy, Logger } from "@miqro/core";
import { ParseResultsHandlerOptions, traverseAPIRouteDir, ValidateBodyHandlerOptions, ValidateParamsHandlerOptions, ValidateQueryHandlerOptions } from "@miqro/handlers";
import { basename, resolve } from "path";

export const getDOCJSON = ({ dirname, subPath }: { dirname: string; subPath: string; }, logger: Logger): {
  path: string;
  methods: string[];
  identifier: string;
  description: string;
  query: false | ValidateQueryHandlerOptions;
  body: false | ValidateBodyHandlerOptions;
  params: false | ValidateParamsHandlerOptions;
  policy: GroupPolicy;
  results: ParseResultsHandlerOptions;
  featureName: string;
}[] => {
  const apiTraverse = traverseAPIRouteDir(logger, basename(dirname).toUpperCase(), resolve(ConfigPathResolver.getBaseDirname(), dirname), subPath);
  const docJSON = Object.keys(apiTraverse.features).map(featureName => {
    const { path, methods, identifier, apiHandlerOptions } = apiTraverse.features[featureName];
    const { description, query, body, params, policy, results } = apiHandlerOptions;
    return {
      path, methods, identifier,
      description, query, body, params, policy, results,
      featureName
    };
  });
  return docJSON;
}
