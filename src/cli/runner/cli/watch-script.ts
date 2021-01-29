import {startWatch} from "./watch-util";

export const main = (): void => {
  startWatch("start-script", `arguments: [nodes=1] [mode=simple] <microservice.js>`);
}
