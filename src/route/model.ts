import * as express from "express";
import { IModelService, ISession } from "../service";
import { Util } from "../util";
import { IAPIRequest, ModelServiceResponse } from "./response";
import { ServiceRoute, IServiceRouteOptions } from "./service";

let logger = null;

export class ModelRoute extends ServiceRoute {
  public static createModelMethodHandler(
    handler: (req: IAPIRequest, res: express.Response, next: express.NextFunction) => Promise<any>
  ) {
    return;
  }
  constructor(protected service: IModelService, options?: IServiceRouteOptions) {
    super(options);
    if (!logger) {
      logger = Util.getLogger("ModelServiceRoute");
    }
    // Get All
    this.get("/", async (req: IAPIRequest, res: express.Response) => {
      return await this.getInstance(req, res);
    });
    // Get by Id
    this.get("/:id", async (req: IAPIRequest, res: express.Response) => {
      return await this.getInstance(req, res);
    });
    // Post
    this.post("/", async (req: IAPIRequest, res: express.Response) => {
      return await this.postInstance(req, res);
    });
    // Delete by id
    this.delete("/:id", async (req: IAPIRequest, res: express.Response) => {
      return await this.delInstance(req, res);
    });
    // Patch by id
    this.patch("/:id", async (req: IAPIRequest, res: express.Response) => {
      return await this.patchInstance(req, res);
    });
  }

  async getInstance(req: IAPIRequest, res: express.Response) {
    const body = req.body;
    Util.parseOptions("body", body, [], "no_extra");
    const ret = await this.service.get({
      session: req.session,
      what: req.params.id !== undefined ? { id: [req.params.id] } : {}
    });
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ModelServiceResponse(ret).send(res);
  }
  async postInstance(req: IAPIRequest, res: express.Response) {
    const body = req.body;
    const { post } = Util.parseOptions("body", body, [
      { name: "post", type: "object", required: true }
    ], "no_extra");
    const ret = await this.service.post({
      session: req.session,
      post
    });
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ModelServiceResponse(ret).send(res);
  }
  async delInstance(req: IAPIRequest, res: express.Response) {
    const body = req.body;
    Util.parseOptions("body", body, [], "no_extra");
    const ret = await this.service.delete({
      session: req.session,
      what: req.params.id !== undefined ? { id: [req.params.id] } : {}
    });
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ModelServiceResponse(ret).send(res);
  }
  async patchInstance(req: IAPIRequest, res: express.Response) {
    const body = req.body;
    const { patch } = Util.parseOptions("body", body, [
      { name: "patch", type: "object", required: true }
    ], "no_extra");
    const ret = await this.service.patch({
      session: req.session,
      what: req.params.id !== undefined ? { id: [req.params.id] } : {},
      patch
    });
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ModelServiceResponse(ret).send(res);
  }


}
