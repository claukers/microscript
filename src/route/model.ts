import * as express from "express";
import { IModelService, ISession } from "../service";
import { Util } from "../util";
import { IAPIRequest, ModelServiceResponse } from "./response";
import { ServiceRoute } from "./service";

let logger = null;

export class ModelRoute extends ServiceRoute {
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
    const get = async (req: IAPIRequest, res: express.Response) => {
      const ret = await service.get({
        session: req.session,
        what: req.params.id !== undefined ? { id: [req.params.id] } : {}
      });
      logger.debug(`${req.method} handler ret [${ret}]`);
      await new ModelServiceResponse(ret).send(res);
    };
    const post = async (req: IAPIRequest, res: express.Response) => {
      const body = req.body;
      const { post } = Util.parseOptions("body", body, [
        { name: "post", type: "object", required: true }
      ], "no_extra");
      const ret = await service.post({
        session: req.session,
        post
      });
      logger.debug(`${req.method} handler ret [${ret}]`);
      await new ModelServiceResponse(ret).send(res);
    };
    const del = async (req: IAPIRequest, res: express.Response) => {
      const ret = await service.delete({
        session: req.session,
        what: req.params.id !== undefined ? { id: [req.params.id] } : {}
      });
      logger.debug(`${req.method} handler ret [${ret}]`);
      await new ModelServiceResponse(ret).send(res);
    };
    const patch = async (req: IAPIRequest, res: express.Response) => {
      const body = req.body;
      const { patch } = Util.parseOptions("body", body, [
        { name: "patch", type: "object", required: true }
      ], "no_extra");
      const ret = await service.patch({
        session: req.session,
        what: req.params.id !== undefined ? { id: [req.params.id] } : {},
        patch
      });
      logger.debug(`${req.method} handler ret [${ret}]`);
      await new ModelServiceResponse(ret).send(res);
    };
    // Get All
    this.get("/", get);
    // Get by Id
    this.get("/:id", get);
    // Post
    this.post("/", post);
    // Delete by id
    this.delete("/:id", del);
    // Patch by id
    this.patch("/:id", patch);
  }

}
