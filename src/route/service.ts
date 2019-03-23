import * as express from "express";
import { Util } from "../util";
import { BadRequestResponse, IAPIRequest, NotFoundResponse } from "./response";
import { Route } from "./route";

let logger;

export interface IServiceHandler {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
  (req: IAPIRequest, res: express.Response, next: express.NextFunction): Promise<any>;
}

export class ServiceRoute extends Route {
  constructor() {
    super();
    logger = Util.getLogger("ServiceRoute");
  }
  protected addRoute(method: string, route: string, handler: IServiceHandler) {
    this.router[method](route, async (req, res, next) => {
      try {
        // TODO get session
        const session = null;
        const ret = await handler(req, res, next);
        logger.debug(`${req.method} handler ret [${ret}]`);
        return true;
      } catch (e) {
        if (e.isMethodNotImplementedError) {
          new NotFoundResponse().send(res);
        } else if (e.isParserOptionsError) {
          new BadRequestResponse(e.message).send(res);
        } else {
          logger.error(e);
        }
      }
    });
  }
}
