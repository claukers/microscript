import { ServiceRoute, IServiceRouteOptions } from "./service";
import { IAPIRequest } from "./response";
import * as express from "express";

export class AuthRoute extends ServiceRoute {
  private jwtInited = false;
  constructor(options?: IServiceRouteOptions) {
    super(options);
    this.post("/login", async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {

    });
    this.get("/login", async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {

    });
    this.get("/logout", async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {

    });
  }
}
