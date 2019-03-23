import * as Sequelize from "sequelize";
import { Util } from "../util";
import { AbstractModelService } from "./amodel";
import { IGetArgs, IModelService, IPatchArgs, IPostArgs, MethodNotImplementedError } from "./common";

let logger = null;

export class ModelService extends AbstractModelService {
  constructor(protected model: Sequelize.Model<any, any>) {
    super();
    if (!logger) {
      logger = Util.getLogger("ModelService");
    }
  }
  public async get(options: IGetArgs): Promise<any> {
    return this.model.findAll({
      where: options.what
    });
  }
}
