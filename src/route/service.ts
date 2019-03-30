import * as express from "express";
import { Util } from "../util";
import { BadRequestResponse, ErrorResponse, IAPIRequest, NotFoundResponse } from "./response";
import { Route } from "./route";

let logger;

export interface IServiceHandler {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
  (req: IAPIRequest, res: express.Response, next: express.NextFunction): Promise<any>;
}

export interface IServiceRouteOptions {
  allowedMethods?: string[];
}

export class ServiceRoute extends Route {
  constructor(protected options?: IServiceRouteOptions) {
    super();
    if (!logger) {
      logger = Util.getLogger("ServiceRoute");
    }
  }
  public get(route: string, handler: IServiceHandler) {
    this.addRoute("get", route, handler);
  }
  public post(route: string, handler: IServiceHandler) {
    this.addRoute("post", route, handler);
  }
  public delete(route: string, handler: IServiceHandler) {
    this.addRoute("delete", route, handler);
  }
  public patch(route: string, handler: IServiceHandler) {
    this.addRoute("patch", route, handler);
  }
  public use(route: string, handler: IServiceHandler) {
    this.addRoute(null, route, handler);
  }
  protected addRoute(method: string, route: string, handler: IServiceHandler) {
    const realHandler = async (req: IAPIRequest, res, next) => {
      try {
        if (this.options && this.options.allowedMethods && this.options.allowedMethods.indexOf(req.method.toUpperCase()) === -1) {
          new NotFoundResponse().send(res);
        } else {
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
        } else {
          logger.error(e);
          new ErrorResponse(e.message).send(res);
        }
      }
    };
    if (!method) {
      if (route) {
        this.router.use(route, realHandler);
      } else {
        this.router.use(realHandler);
      }
    } else {
      if (route) {
        this.router[method](route, realHandler);
      } else {
        this.router[method](realHandler);
      }
    }
  }
}
