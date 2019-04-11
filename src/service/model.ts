import * as Sequelize from "sequelize";
import { Database } from "../db";
import { ParseOptionsError, Util } from "../util";
import { AbstractModelService, IServiceArgs } from "./common";

let logger = null;

export class ModelService extends AbstractModelService {
  constructor(protected model: Sequelize.Model<any, any>) {
    super();
    if (!logger) {
      logger = Util.getLogger("ModelService");
    }
  }
  public async get({ body, query, params, session }: IServiceArgs): Promise<any> {
    const { include } = Util.parseOptions("query", query, [
      { name: "include", type: "string", required: false }
    ], "no_extra");
    const includeModels = [];
    if (include) {
      let includeList = [];
      try {
        includeList = JSON.parse(include);
      } catch (e) {
        throw new ParseOptionsError(`query.include not a valid JSON`);
      }
      for (const includeModel of includeList) {
        const model = Database.getInstance().models[includeModel];
        if (model) {
          includeModels.push(model);
        } else {
          throw new ParseOptionsError(`query.include[${includeModel}] model doesnt exists!`);
        }
      }
    }
    Util.parseOptions("body", body, [], "no_extra");
    let ret;
    if (Object.keys(params).length > 0) {
      ret = await this.model.findAll({
        where: params,
        include: includeModels
      });
    } else {
      ret = await this.model.findAll({
        include: includeModels
      });
    }
    return ret;
  }
  public async post({ body, query, params, session }: IServiceArgs): Promise<any> {
    Util.parseOptions("params", params, [], "no_extra");
    Util.parseOptions("query", query, [], "no_extra");
    return this.model.create(body);
  }
  public async patch({ body, query, params, session }: IServiceArgs): Promise<any> {
    Util.parseOptions("query", query, [], "no_extra");
    const instances = await this.get({
      session,
      body: {},
      query,
      params,
      headers: {}
    });
    if (instances.length === 1) {
      return instances[0].update(body);
    } else {
      return null;
    }
  }
  public async delete({ body, query, params, session }: IServiceArgs): Promise<any> {
    Util.parseOptions("query", query, [], "no_extra");
    Util.parseOptions("body", body, [], "no_extra");
    const instances = await this.get({
      session,
      body: {},
      query,
      params,
      headers: {}
    });
    if (instances.length === 1) {
      return instances[0].destroy();
    } else {
      return null;
    }
  }
}
