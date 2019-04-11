import * as jsonwebtoken from "jsonwebtoken";
import { IAPIRequest } from "../route";
import { Util } from "../util";
import { INoTokenSession, ISession, MethodNotImplementedError } from "./common";

let logger = null;

export interface IAuthOptions {
  authenticate?: IAuthAuthenticate;
  onAuthenticate?: IAuthOnAuthentication;
  verify?: IAuthVerify;
}

export interface IAuthService {
  verify(options: { token: string }): Promise<ISession>;
  authenticate(req: IAPIRequest): Promise<ISession>;
}

export type IAuthVerify = (session: ISession) => Promise<boolean>;
export type IAuthAuthenticate = (req: IAPIRequest) => Promise<INoTokenSession>;
export type IAuthOnAuthentication = (session: ISession) => Promise<void>;

export class AuthService implements IAuthService {
  constructor(protected options?: IAuthOptions) {
    Util.checkEnvVariables(["JWT_SECRET", "JWT_EXPIRATION"]);
    if (!logger) {
      logger = Util.getLogger("AuthService");
    }
  }
  public async authenticate(req: IAPIRequest): Promise<ISession> {
    if (!this.options.authenticate) {
      throw new MethodNotImplementedError(`authenticate`);
    } else {
      try {
        const noTokenSession = await this.options.authenticate(req);
        if (noTokenSession) {
          const token = jsonwebtoken.sign(noTokenSession, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
          });
          const session = {
            token,
            account: noTokenSession.account,
            groups: noTokenSession.groups,
            username: noTokenSession.username
          };
          if (this.options.onAuthenticate) {
            await this.options.onAuthenticate(session);
          }
          return session;
        } else {
          return null;
        }
      } catch (e) {
        logger.error(e);
        return null;
      }
    }
  }
  public async verify({ token }): Promise<ISession> {
    return new Promise((resolve) => {
      try {
        jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            logger.error(err);
            resolve(null);
          } else {
            if (this.options.verify) {
              try {
                const verified = await this.options.verify(decoded);
                if (verified) {
                  resolve(decoded);
                }
              } catch (e) {
                logger.error(e);
                resolve(null);
              }
            }
          }
        });
      } catch (e) {
        logger.error(e);
        resolve(null);
      }
    });
  }
}
