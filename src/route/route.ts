import * as express from "express";

export class Route {
  protected router: express.Router;
  constructor() {
    this.router = express.Router();
  }
  public routes(): express.Router {
    return this.router;
  }
}
