import { APIResponse } from "./api";

export class ModelServiceResponse extends APIResponse {
  constructor(result: any) {
    super({
      success: result ? true : false,
      result
    });
    if (!result) {
      this.status = 400;
    }
  }
}
