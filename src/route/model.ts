import * as express from "express";
import { IModelService, ISession } from "../service";
import { Util } from "../util";
import { AuthResponse, IAPIRequest, ModelServiceResponse } from "./response";
import { IServiceRouteOptions, ServiceRoute } from "./service";

export interface IModelRoute {
  getInstance(req: IAPIRequest, res: express.Response): Promise<void>;
  postInstance(req: IAPIRequest, res: express.Response): Promise<void>;
  deleteInstance(req: IAPIRequest, res: express.Response): Promise<void>;
  patchInstance(req: IAPIRequest, res: express.Response): Promise<void>;
}

let logger = null;

export class ModelRoute extends ServiceRoute implements IModelRoute {
  constructor(protected service: IModelService, options?: IServiceRouteOptions) {
    super(options);
    if (!logger) {
      logger = Util.getLogger("ModelServiceRoute");
    }
    // Get All
    this.get("/", async (req: IAPIRequest, res: express.Response) => {
      return this.getInstance(req, res);
    });
    // Get by Id
    this.get("/:id", async (req: IAPIRequest, res: express.Response) => {
      return this.getInstance(req, res);
    });
    // Post
    this.post("/", async (req: IAPIRequest, res: express.Response) => {
      return this.postInstance(req, res);
    });
    // Delete by id
    this.delete("/:id", async (req: IAPIRequest, res: express.Response) => {
      return this.deleteInstance(req, res);
    });
    // Patch by id
    this.patch("/:id", async (req: IAPIRequest, res: express.Response) => {
      return this.patchInstance(req, res);
    });
  }
  public async getInstance(req: IAPIRequest, res: express.Response) {
    const body = req.body;
    Util.parseOptions("body", body, [], "no_extra");
    const ret = await this.service.get({
      session: req.session,
      what: req.params.id !== undefined ? { id: [req.params.id] } : {}
    });
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ModelServiceResponse(ret).send(res);
  }
  public async postInstance(req: IAPIRequest, res: express.Response) {
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
  public async deleteInstance(req: IAPIRequest, res: express.Response) {
    const body = req.body;
    Util.parseOptions("body", body, [], "no_extra");
    const ret = await this.service.delete({
      session: req.session,
      what: req.params.id !== undefined ? { id: [req.params.id] } : {}
    });
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ModelServiceResponse(ret).send(res);
  }
  public async patchInstance(req: IAPIRequest, res: express.Response) {
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
