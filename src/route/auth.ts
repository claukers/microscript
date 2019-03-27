import { IAPIRequest, AuthResponse } from "./response";
import * as express from "express";
import { IProtectedRouteOptions, ProtectedRoute } from "./protected";
import { Util } from "../util";
import { ISession } from "../service";

let logger = null;

export class AuthRoute extends ProtectedRoute {
  constructor(options?: IProtectedRouteOptions) {
    super(options);
    if (!logger) {
      logger = Util.getLogger("ProtectedRoute");
    }
  }
  protected initJwt() {
    if (!this.jwtInited) {
      this.post("/authenticate", async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {
        const session: ISession = await this.authService.authenticate(req);
        await new AuthResponse(session).send(res);
      });
      super.initJwt();
      this.get("/authentication", async (req: IAPIRequest, res: express.Response, next: express.NextFunction) => {
        await new AuthResponse(req.session).send(res);
      });
    }
  }
}
