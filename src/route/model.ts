import * as express from "express";
import { IModelService, ISession } from "../service";
import { Util } from "../util";
import { IAPIRequest, ModelServiceResponse } from "./response";
import { ServiceRoute } from "./service";

let logger = null;

export class ModelServiceRoute extends ServiceRoute {
  public static createModelMethodHandler(
    handler: (req: IAPIRequest, res: express.Response, next: express.NextFunction) => Promise<any>
  ) {
    return;
  }
  constructor(service: IModelService) {
    super();
    if (!logger) {
      logger = Util.getLogger("ModelServiceRoute");
    }
    // Get all
    this.addRoute("get", "/",
      async (
        req: IAPIRequest,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const ret = await service.get({
          session: req.session,
          what: req.params.id !== undefined ? { id: [req.params.id] } : {}
        });
        logger.debug(`${req.method} handler ret [${ret}]`);
        await new ModelServiceResponse(ret).send(res);
      }
    );
    // Get by id
    /*this.addRoute("get", "/:id",
      ModelServiceRoute.createModelMethodHandler(
        async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {
          return await service.get({
            session: req.session,
            what: req.params.id !== undefined ? { id: [req.params.id] } : {}
          })
        })
    );*/
  }

}
