import { ServiceRoute, IServiceHandler, IServiceRouteOptions } from "./service";
import { IAPIRequest, BadRequestResponse } from "./response";
import * as express from "express";
import { Util } from "../util";
import { AuthService, ISession } from "../service";

let logger = null;

export class ProtectedRoute extends ServiceRoute {
  private jwtInited = false;
  private authService: AuthService;
  constructor(options?: IServiceRouteOptions) {
    super(options);
    if (!logger) {
      logger = Util.getLogger("ProtectedRoute");
    }
    Util.checkEnvVariables(["JWT_HEADER"]);
    this.authService = AuthService.getInstance();
  }
  protected initJwt() {
    if (!this.jwtInited) {
      this.jwtInited = true;
      this.router.use(async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {
        try {
          const token = req.header(process.env.JWT_HEADER);
          if (token) {
            const session: ISession = await this.authService.verify(token);
            if (session) {
              req.session = session;
              next();
              return;
            }
          } else {
            await new BadRequestResponse(`No token provided!`).send(res);
          }
          await new BadRequestResponse(`Fail to authenticate token!`).send(res);
        } catch (e) {
          logger.error(e);
          await new BadRequestResponse(`Fail to authenticate token!`).send(res);
        }
      });
    }
  }
  protected addRoute(method: string, route: string, handler: IServiceHandler) {
    this.initJwt();
    super.addRoute(method, route, handler);
  }
}
