import { ret } from "../utils";
import { setUpUserApi } from "./userApi";

async function apiDebug(req: any, res: any) {
  return ret(res, "Nothing");
}

export function setUpApi(app: any) {
  app.get("/api/", apiDebug);

  setUpUserApi(app);
}
