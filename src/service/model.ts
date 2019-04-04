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
    return this.model.findAll({
      where: options.what
    });
  }
  public async post(options: IServiceArgs): Promise<any> {
    return this.model.create(options.post);
  }
  public async patch(options: IServiceArgs): Promise<any> {
    const instances = await this.get(options);
    if (instances.length === 1) {
      return instances[0].update(options.patch);
    } else {
      return null;
    }
  }
  public async delete(options: IServiceArgs): Promise<any> {
    const instances = await this.get(options);
    if (instances.length === 1) {
      return instances[0].destroy();
    } else {
      return null;
    }
  }
}
