import { ConfigPathResolver, GroupPolicy, ParseOption, ParseOptionMap, parseOptionMap2ParseOptionList } from "@miqro/core";
import { resolve } from "path";
import { writeFileSync } from "fs";


import { Util } from "@miqro/core";
import { getDOCJSON } from "../util";

export const main = (): void => {
  const logger = console;

  if (process.argv.length !== 6) {
    throw new Error(`arguments: <api_folder> <subPath> <out.md>`);
  }

  const dirname = process.argv[3];
  const subPath = process.argv[4];
  const outPath = process.argv[5];

  Util.getConfig();

  const docJSON = getDOCJSON({ dirname, subPath }, logger as any);

  const policyTable = (policy: GroupPolicy | undefined | false): string => {
    if (policy) {
      return `|policy|groups|\n|----|----|\n|${policy.groupPolicy}|${policy.groups.join(", ")}|`;
    } else {
      return "```no policy provided!!```";
    }

  };
  const methodUrlTable = (options: { path: string; methods: string[] }): string => {
    const rows: string[] = [];
    const paths = (options.path as any) instanceof Array ? options.path : [options.path];
    for (const p of paths) {
      for (const m of options.methods) {
        rows.push(`|${m}|${p}|`);
      }
    }
    return `|method|path|\n|----|----|\n${rows.join("\n")}`;
  };

  const getRange = (o: ParseOption, t: string): string => {
    let range = " ";
    switch (t) {
      case "string":
        if (o.stringMinLength !== undefined || o.stringMaxLength !== undefined) {
          range = "";
        }
        if (o.stringMinLength !== undefined) {
          range = `${o.stringMinLength}:`;
        }
        if (o.stringMaxLength !== undefined) {
          range += `:${o.stringMaxLength}`;
        }
        break;
      case "number":
        if (o.numberMin !== undefined || o.numberMax !== undefined) {
          range = "";
        }
        if (o.numberMin !== undefined) {
          range = `${o.numberMin}:`;
        }
        if (o.numberMax !== undefined) {
          range += `:${o.numberMax}`;
        }
        if (o.numberMinDecimals !== undefined) {
          range = `${range ? " " : ""}decimal ${o.numberMinDecimals}:`;
        }
        if (o.numberMaxDecimals !== undefined) {
          range += `${range ? " " : ""}${o.numberMinDecimals !== undefined ? "" : "decimal "}:${o.numberMaxDecimals}`;
        }
        break;
      case "array":
        if (o.arrayMinLength !== undefined || o.arrayMaxLength !== undefined) {
          range = "";
        }
        if (o.arrayMinLength !== undefined) {
          range = `${o.arrayMinLength}:`;
        }
        if (o.arrayMaxLength !== undefined) {
          range += `:${o.arrayMaxLength}`;
        }
        break;
    }
    return range;
  };

  const parseOptionTable = (options: { options: ParseOption[] | ParseOptionMap; } | false | undefined, subName = "", tableHeaders: number | null = 0): string => {
    if (options) {
      let padding = "";
      for (let i = 0; i < tableHeaders; i++) {
        padding += "| ";
      }
      const hl = "|----|----|----|----|----|----|----|----|----|----|";
      options.options = options.options instanceof Array ? options.options : parseOptionMap2ParseOptionList(options.options);
      const headers = `|**name**|**description**|**type**|**arrayRange**|**arrayType**|**range**|**values**|**defaultValue**|**required**|**allowNull**|`;
      return `${tableHeaders >= 0 ? `${padding}${headers}\n${tableHeaders === 0 ? `${padding}${hl}\n` : ""}` : ""}${options.options.map(o => {
        const arrayRange = o.type === "array" ? getRange(o, o.type) : " ";
        const range = o.type === "array" ? (o.arrayType ? getRange(o, o.arrayType) : " ") : getRange(o, o.type);
        let out = `${padding}|${subName}${o.name}|${o.description ? o.description : " "}|${o.type}|${arrayRange}|${o.arrayType ? o.arrayType : " "}|` +
          `${range}|` +
          `${o.enumValues ? o.enumValues.join(", ") : " "}|${o.defaultValue !== undefined ? o.defaultValue : " "}|${o.required}|${o.allowNull ? "true" : "false"}|`;
        if (o.type === "multiple" || o.arrayType === "multiple") {
          out += `\n${parseOptionTable({
            options: o.multipleOptions.map(oM => {
              return {
                name: o.name,
                ...oM
              };
            })
          }, "", tableHeaders ? tableHeaders + 1 : 1)}`;
          return out;
        } else if (o.type === "nested" || o.arrayType === "nested") {
          out += `\n${parseOptionTable({ options: o.nestedOptions.options }, `${subName}${o.name}.`, tableHeaders ? tableHeaders + 1 : 1)}`;
          return out;
        } else {
          return out;
        }
      }).join("\n")}`;
    } else if (options === false) {
      return "";
    } else {
      return "not defined";
    }
  };

  const FAKE_TAB = "    ";
  const FAKE_DOUBLE_TAB = `${FAKE_TAB}${FAKE_TAB}`;

  const featureIndex = `## Features\n\n${docJSON.map(doc => {
    return `- [${doc.featureName}](#${doc.featureName.toLowerCase()})\n\n${doc.description ? `${FAKE_TAB}${doc.description}\n\n` : ""}${FAKE_DOUBLE_TAB}${doc.path}`;
  }).join("\n\n")}`;

  writeFileSync(resolve(ConfigPathResolver.getBaseDirname(), outPath), `${featureIndex}\n\n` + docJSON.map(doc => {
    let queryTable = parseOptionTable(doc.query);
    // let paramsTable = parseOptionTable(doc.params);
    let bodyTable = parseOptionTable(doc.body);
    let resultsTable = doc.results ? parseOptionTable(doc.results) : "";
    if (queryTable.split("\n").length > 1) {
      queryTable = `- query\n\n${queryTable}`;
    } else {
      queryTable = queryTable === "" ? "" : `- query: ${queryTable}`;
    }
    /*if (paramsTable.split("\n").length > 1) {
      paramsTable = `- params\n\n${paramsTable}`;
    } else {
      paramsTable = paramsTable === "" ? "" : `- params: ${paramsTable}`;
    }*/
    if (bodyTable.split("\n").length > 1) {
      bodyTable = `- body\n\n${bodyTable}`;
    } else {
      bodyTable = bodyTable === "" ? "" : `- body: ${bodyTable}`;
    }
    if (resultsTable.split("\n").length > 1) {
      resultsTable = `- response.data.result\n\n${resultsTable}`;
    } else {
      resultsTable = resultsTable === "" ? "" : `- response.data.result: ${resultsTable}`;
    }

    const pTable = policyTable(doc.policy);

    return `### ${doc.featureName}\n\n` +
      `${doc.description ? `${doc.description}\n\n` : ""}` +
      `${pTable ? `${pTable}\n\n` : ""}` +
      `- endpoint\n\n` +
      `${methodUrlTable(doc)}\n\n` +
      // `${paramsTable ? `${paramsTable}\n\n` : ""}` +
      `${queryTable ? `${queryTable}\n\n` : ""}` +
      `${bodyTable ? `${bodyTable}\n\n` : ""}` +
      `${resultsTable ? `${resultsTable}\n\n` : ""}`;
  }).join("\n\n"));

}
