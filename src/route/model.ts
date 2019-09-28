import { Response } from "express";
import { IModelService, ServiceArg } from "../service";
import { Util } from "../util";
import { IServiceRouteOptions } from "./common/service";
import { IAPIRequest, ServiceResponse } from "./response";
import { ServiceRoute } from "./service";

export interface IModelRoute {
  getInstance(req: IAPIRequest, res: Response): Promise<void>;
  postInstance(req: IAPIRequest, res: Response): Promise<void>;
  deleteInstance(req: IAPIRequest, res: Response): Promise<void>;
  patchInstance(req: IAPIRequest, res: Response): Promise<void>;
  putInstance(req: IAPIRequest, res: Response): Promise<void>;
}

let logger = null;

export class ModelRoute extends ServiceRoute implements IModelRoute {
  constructor(protected service: IModelService, options?: IServiceRouteOptions) {
    super(options);
    if (!logger) {
      logger = Util.getLogger("ModelServiceRoute");
    }
    // Get All
    this.get("/", async (req: IAPIRequest, res: Response) => {
      return this.getInstance(req, res);
    });
    // Get by Id
    this.get("/:id", async (req: IAPIRequest, res: Response) => {
      return this.getInstance(req, res);
    });
    // Post
    this.post("/", async (req: IAPIRequest, res: Response) => {
      return this.postInstance(req, res);
    });
    // Delete by id
    this.delete("/:id", async (req: IAPIRequest, res: Response) => {
      return this.deleteInstance(req, res);
    });
    // Patch by id
    this.patch("/:id", async (req: IAPIRequest, res: Response) => {
      return this.patchInstance(req, res);
    });
    // Patch by id
    this.put("/", async (req: IAPIRequest, res: Response) => {
      return this.putInstance(req, res);
    });
  }
  public async getInstance(req: IAPIRequest, res: Response) {
    const ret = await this.service.get(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async postInstance(req: IAPIRequest, res: Response) {
    const ret = await this.service.post(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async deleteInstance(req: IAPIRequest, res: Response) {
    const ret = await this.service.delete(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async patchInstance(req: IAPIRequest, res: Response) {
    const ret = await this.service.patch(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
  public async putInstance(req: IAPIRequest, res: Response) {
    const ret = await this.service.put(new ServiceArg(req));
    logger.debug(`${req.method} handler ret [${ret}]`);
    await new ServiceResponse(ret).send(res);
  }
}
