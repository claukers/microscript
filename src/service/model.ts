import * as Sequelize from "sequelize";
import { Util, ParseOptionsError } from "../util";
import { AbstractModelService, IServiceArgs } from "./common";
import { Database } from "../db";

let logger = null;

export class ModelService extends AbstractModelService {
  constructor(protected model: Sequelize.Model<any, any>) {
    super();
    if (!logger) {
      logger = Util.getLogger("ModelService");
    }
  }
  public async get(options: IServiceArgs): Promise<any> {
    const { body, query, params } = Util.parseOptions("request", options, [
      { name: "body", type: "object", required: true },
      { name: "query", type: "object", required: true },
      { name: "params", type: "object", required: true },
      { name: "session", type: "object", required: false }
    ], "no_extra");
    const { include } = Util.parseOptions("query", query, [
      { name: "include", type: "string", required: false }
    ], "no_extra");
    let include_models = [];
    if (include) {
      let include_list = [];
      try {
        include_list = JSON.parse(include);
      } catch (e) {
        throw new ParseOptionsError(`query.include not a valid JSON`);
      }
      for (const include_model of include_list) {
        const model = Database.getInstance().models[include_model];
        if (model) {
          include_models.push(model);
        } else {
          throw new ParseOptionsError(`query.include[${include_model}] model doesnt exists!`);
        }
      }
    }
    Util.parseOptions("body", body, [], "no_extra");
    let ret;
    if (Object.keys(params).length > 0) {
      ret = await this.model.findAll({
        where: params,
        include: include_models
      });
    } else {
      ret = await this.model.findAll({
        include: include_models
      });
    }
    return ret;
  }
  public async post(options: IServiceArgs): Promise<any> {
    const { body, query, params } = Util.parseOptions("request", options, [
      { name: "body", type: "object", required: true },
      { name: "query", type: "object", required: true },
      { name: "params", type: "object", required: true },
      { name: "session", type: "object", required: false }
    ], "no_extra");
    Util.parseOptions("params", params, [], "no_extra");
    Util.parseOptions("query", query, [], "no_extra");
    return this.model.create(body);
  }
  public async patch(options: IServiceArgs): Promise<any> {
    const { body, query, params } = Util.parseOptions("request", options, [
      { name: "body", type: "object", required: true },
      { name: "query", type: "object", required: true },
      { name: "params", type: "object", required: true },
      { name: "session", type: "object", required: false }
    ], "no_extra");
    Util.parseOptions("params", params, [
      { name: "id", type: "number", required: true }
    ], "no_extra");
    Util.parseOptions("query", query, [], "no_extra");
    const instances = await this.get({
      session: options.session,
      body: {},
      query,
      params
    });
    if (instances.length === 1) {
      return instances[0].update(body);
    } else {
      return null;
    }
  }
  public async delete(options: IServiceArgs): Promise<any> {
    const { body, query, params } = Util.parseOptions("request", options, [
      { name: "body", type: "object", required: true },
      { name: "query", type: "object", required: true },
      { name: "params", type: "object", required: true },
      { name: "session", type: "object", required: false }
    ], "no_extra");
    Util.parseOptions("params", params, [
      { name: "id", type: "number", required: true }
    ], "no_extra");
    Util.parseOptions("query", query, [], "no_extra");
    Util.parseOptions("body", body, [], "no_extra");
    const instances = await this.get({
      session: options.session,
      body: {},
      query,
      params
    });
    if (instances.length === 1) {
      return instances[0].destroy();
    } else {
      return null;
    }
  }
}
