import {startWatch} from "./watch-util";

export const main = (): void => {
  startWatch("start-api", `arguments: [nodes=1] [mode=simple] <microservice.js>`);
}
