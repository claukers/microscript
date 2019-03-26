import { Util } from "../util";
import { ISession } from "./common";

export class AuthService {
  private static instance = null;
  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  constructor() {
    Util.checkEnvVariables(["JWT_SECRET", "JWT_EXPIRATION"]);
  }
  public async authenticate(options: { username: string, password: string }): Promise<ISession> {
    return {
      token: "1",
      account: null,
      groups: null,
      user: null
    };
  }
  public async verify(token: string): Promise<ISession> {
    return {
      token,
      account: null,
      groups: null,
      user: null
    };
  }
}
