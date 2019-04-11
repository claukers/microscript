import { ISession } from "../../service";
import { APIResponse } from "./api";

export class AuthResponse extends APIResponse {
  constructor(session?: ISession) {
    super({
      success: session ? true : false,
      message: session ? "success" : "Not Authorized!",
      session: session ? session : false
    });
  }
}
