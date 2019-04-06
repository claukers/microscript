import * as Sequelize from "sequelize";
import { Util } from "../util";
import { AbstractModelService, IServiceArgs } from "./common";

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
    Util.parseOptions("params", params, [
      { name: "id", type: "number", required: false }
    ], "no_extra");
    Util.parseOptions("query", query, [], "no_extra");
    Util.parseOptions("body", body, [], "no_extra");
    let ret;
    if (options.params.id) {
      ret = await this.model.findAll({
        where: {
          id: options.params.id
        }
      });
    } else {
      ret = await this.model.findAll();
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
