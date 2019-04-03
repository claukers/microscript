import { IServiceArgs } from "./args";

export interface IGetArgs extends IServiceArgs {
  what: {
    id?: number[];
  };
}

export interface IPostArgs extends IServiceArgs {
  post: {
    [name: string]: string | number | boolean | object
  };
}

export interface IPutArgs extends IServiceArgs {
  put: {
    [name: string]: string | number | boolean | object
  };
}

export interface IPatchArgs extends IGetArgs {
  patch: {
    [name: string]: string | number | boolean | object
  };
}

export class MethodNotImplementedError extends Error {
  public isMethodNotImplementedError = true;
  constructor(method: string) {
    super(`method ${method} not implemented!`);
  }
}

export interface IModelService {
  get(options: IGetArgs): Promise<any>;
  post(options: IPostArgs): Promise<any>;
  put(options: IPutArgs): Promise<any>;
  patch(options: IPatchArgs): Promise<any>;
  delete(options: IGetArgs): Promise<any>;
}
