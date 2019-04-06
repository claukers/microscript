import * as express from "express";
import { ServiceArg } from "../service";
import { Util } from "../util";
import { BadRequestResponse, ErrorResponse, IAPIRequest, NotFoundResponse, ServiceResponse } from "./response";
import { Route } from "./route";

let logger;

export interface IServiceHandler {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
  (req: IAPIRequest, res: express.Response, next: express.NextFunction): Promise<any>;
}

export interface IServiceRouteOptions {
  allowedMethods?: string[];
}

export function createServiceHandler(service, method) {
  return async (req, res) => {
    await new ServiceResponse(
      await service[method](
        new ServiceArg(req)
      )
    ).send(res);
  };
}

export class ServiceRoute extends Route {
  constructor(protected options?: IServiceRouteOptions) {
    super();
    if (!logger) {
      logger = Util.getLogger("ServiceRoute");
    }
  }
  public get(route: string | string[], handler: IServiceHandler) {
    this.addRoute("get", route, handler);
  }
  public post(route: string | string[], handler: IServiceHandler) {
    this.addRoute("post", route, handler);
  }
  public delete(route: string | string[], handler: IServiceHandler) {
    this.addRoute("delete", route, handler);
  }
  public patch(route: string | string[], handler: IServiceHandler) {
    this.addRoute("patch", route, handler);
  }
  public put(route: string | string[], handler: IServiceHandler) {
    this.addRoute("put", route, handler);
  }
  public use(route: string | string[], handler: IServiceHandler) {
    this.addRoute(null, route, handler);
  }
  protected addRoute(method: string, route: string | string[], handler: IServiceHandler) {
    const realHandler = async (req: IAPIRequest, res, next) => {
      try {

        if (this.options && this.options.allowedMethods && this.options.allowedMethods.indexOf(req.method.toUpperCase()) === -1) {
          new NotFoundResponse().send(res);
        } else {
          if (req.session === undefined) {
            req.session = null;
          }
          const ret = await handler(req, res, next);
          logger.debug(`${req.method} handler ret [${ret}]`);
          return ret;
        }
      } catch (e) {
        if (e.isMethodNotImplementedError) {
          new NotFoundResponse().send(res);
        } else if (e.isParserOptionsError) {
          new BadRequestResponse(e.message).send(res);
        } else if (e.name === "SequelizeValidationError") {
          new BadRequestResponse(e.message).send(res);
        } else if (e.name === "SequelizeEagerLoadingError") {
          new BadRequestResponse(e.message).send(res);
        } else {
          logger.error(e);
          new ErrorResponse(e.message).send(res);
        }
      }
    };

    if (!method) {
      if (route) {
        if (typeof route === "string") {
          this.router.use(route, realHandler);
        } else {
          for (const r of route) {
            this.router.use(r, realHandler);
          }
        }
      } else {
        this.router.use(realHandler);
      }
    } else {
      if (route) {
        if (typeof route === "string") {
          this.router[method](route, realHandler);
        } else {
          for (const r of route) {
            this.router[method](r, realHandler);
          }
        }
      } else {
        this.router[method](realHandler);
      }
    }
  }
}
