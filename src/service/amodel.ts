import { IGetArgs, IModelService, IPatchArgs, IPostArgs, MethodNotImplementedError } from "./common";

export abstract class AbstractModelService implements IModelService {
  public async get(options: IGetArgs): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }
  public async post(options: IPostArgs): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }
  public async patch(options: IPatchArgs): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }
  public async delete(options: IGetArgs): Promise<any> {
    throw new MethodNotImplementedError("Method not implemented.");
  }
}
