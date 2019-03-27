import { APIResponse } from "./api";
import { ISession } from "../../service";

export class AuthResponse extends APIResponse {
  constructor(session?: ISession) {
    super({
      success: session ? true : false,
      message: session ? JSON.stringify(session) : "Not Authorized!"
    });
  }
}
