import * as express from "express";
import { AuthService, IAuthService, ISession } from "../service";
import { Util } from "../util";
import { BadRequestResponse, IAPIRequest } from "./response";
import { IServiceHandler, IServiceRouteOptions, ServiceRoute } from "./service";

let logger = null;

export interface IProtectedRouteOptions extends IServiceRouteOptions {
  auth: IAuthService;
}

export class ProtectedRoute extends ServiceRoute {
  protected jwtInited = false;
  protected authService: IAuthService;
  constructor(options?: IProtectedRouteOptions) {
    super(options);
    if (!logger) {
      logger = Util.getLogger("ProtectedRoute");
    }
    Util.checkEnvVariables(["JWT_HEADER"]);
    this.authService = options && options.auth ? options.auth : new AuthService();
  }
  protected initJwt() {
    if (!this.jwtInited) {
      this.jwtInited = true;
      this.router.use(async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {
        try {
          const token = req.header(process.env.JWT_HEADER);
          if (!token) {
            await new BadRequestResponse(`No token provided!`).send(res);
          } else {
            const session: ISession = await this.authService.verify({ token });
            if (!session) {
              await new BadRequestResponse(`Fail to authenticate token!`).send(res);
            } else {
              req.session = session;
              next();
            }
          }
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
