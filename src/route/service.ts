import { Util } from "../util";
import { createAPIHandler, IServiceHandler, IServiceRouteOptions } from "./common/service";
import { Route } from "./route";

let logger;

export class ServiceRoute extends Route {
  constructor(public options?: IServiceRouteOptions) {
    super();
    if (!logger) {
      logger = Util.getLogger("ServiceRoute");
    }
  }
  public get(route: string | string[], handler: IServiceHandler) {
    this.addRoute("get", route, handler);
  }
  public post(route: string | string[], handler: IServiceHandler) {
    this.addRoute("post", route, handler);
  }
  public delete(route: string | string[], handler: IServiceHandler) {
    this.addRoute("delete", route, handler);
  }
  public patch(route: string | string[], handler: IServiceHandler) {
    this.addRoute("patch", route, handler);
  }
  public put(route: string | string[], handler: IServiceHandler) {
    this.addRoute("put", route, handler);
  }
  public use(route: string | string[], handler: IServiceHandler) {
    this.addRoute(null, route, handler);
  }
  protected addRoute(method: string, route: string | string[], handler: IServiceHandler) {
    const renderRoute = (r: string): string => {
      return `${this.options && this.options.preRoute ? this.options.preRoute : ""}` +
        `${r}${this.options && this.options.postRoute ? this.options.postRoute : ""}`;
    };
    const realHandler = createAPIHandler(handler, this);
    if (!method) {
      if (route) {
        if (typeof route === "string") {
          this.router.use(renderRoute(route), realHandler);
        } else {
          for (const r of route) {
            this.router.use(renderRoute(r), realHandler);
          }
        }
      } else {
        this.router.use(realHandler);
      }
    } else {
      if (route) {
        if (typeof route === "string") {
          this.router[method](renderRoute(route), realHandler);
        } else {
          for (const r of route) {
            this.router[method](renderRoute(r), realHandler);
          }
        }
      } else {
        this.router[method](realHandler);
      }
    }
  }
}
