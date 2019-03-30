import { IAPIRequest } from "../route";
import { Util } from "../util";
import { ISession } from "./common";

export interface IAuthService {
  verify(options: { token: string }): Promise<ISession>;
  authenticate(req: IAPIRequest): Promise<ISession>;
}

export class AuthService implements IAuthService {
  constructor() {
    Util.checkEnvVariables(["JWT_SECRET", "JWT_EXPIRATION"]);
  }
  public async authenticate(req: IAPIRequest): Promise<ISession> {
    return {
      token: null,
      account: null,
      groups: null,
      user: null
    };
  }
  public async verify({ token }): Promise<ISession> {
    return {
      token,
      account: null,
      groups: null,
      user: null
    };
  }
}
