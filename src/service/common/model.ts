import { IServiceArgs } from "./args";

export class MethodNotImplementedError extends Error {
  public isMethodNotImplementedError = true;
  constructor(method: string) {
    super(`method ${method} not implemented!`);
  }
}

export interface IModelService {
  get(options: IServiceArgs): Promise<any>;
  post(options: IServiceArgs): Promise<any>;
  put(options: IServiceArgs): Promise<any>;
  patch(options: IServiceArgs): Promise<any>;
  delete(options: IServiceArgs): Promise<any>;
}
