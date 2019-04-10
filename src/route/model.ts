import * as express from "express";
import { IModelService, ServiceArg } from "../service";
import { Util } from "../util";
import { IAPIRequest, ServiceResponse } from "./response";
import { IServiceRouteOptions, ServiceRoute } from "./service";

export interface IModelRoute {
  getInstance(req: IAPIRequest, res: express.Response): Promise<void>;
  postInstance(req: IAPIRequest, res: express.Response): Promise<void>;
  deleteInstance(req: IAPIRequest, res: express.Response): Promise<void>;
  patchInstance(req: IAPIRequest, res: express.Response): Promise<void>;
  putInstance(req: IAPIRequest, res: express.Response): Promise<void>;
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
    // Patch by id
    this.put("/", async (req: IAPIRequest, res: express.Response) => {
      return this.putInstance(req, res);
    });
  }
  public async getInstance(req: IAPIRequest, res: express.Response) {
    const ret = await this.service.get(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async postInstance(req: IAPIRequest, res: express.Response) {
    const ret = await this.service.post(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async deleteInstance(req: IAPIRequest, res: express.Response) {
    const ret = await this.service.delete(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async patchInstance(req: IAPIRequest, res: express.Response) {
    const ret = await this.service.patch(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async putInstance(req: IAPIRequest, res: express.Response) {
    const ret = await this.service.put(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
}
