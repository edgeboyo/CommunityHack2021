import { ret } from "../utils";
import { getUser } from "./cookies";

async function setUpStore(req: any, res: any) {
  const userName = getUser(req.cookies);

  if (userName === undefined) return ret(res, "No login token found", 401);

  const store = req.body;
}

export function setUpStoreApi(app: any) {
  app.post("/api/stores", setUpStore);
}
