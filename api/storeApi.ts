import { Datastore } from "@google-cloud/datastore";

import { getUser } from "./cookies";
import { checkFields, ret } from "../utils";
import { checkLoginCookie } from "./cookies";
import { CoordinateLocation, AddressLocation } from "../data/Location";
import { TimeRange, Schedule } from "../data/Schedule";
import {Store} from "../data/Store";
import crypto from "crypto";

const datastore = new Datastore();

async function setUpStore(req: any, res: any) {
  const owner = await getUser(req.cookies);
  const kind = "stores";
  const store: Store = req.body;
  const requiredFields = ["name", "description", "location", "schedule"];
  const d = new Date ();
  let id: string;

  const fieldAudit = checkFields(requiredFields, store);
  if(fieldAudit.length !== 0) {
    return res
        .status(401)
        .send(`Missing field(s) ${JSON.stringify(fieldAudit)}`)
        .end();
  }

  if (owner === undefined) {
    return ret(res, "No login token found", 404);
  } else {
    id = hash256(store.name + owner + d.getTime());
  }

  store ["id"] = id;
  const name = store.name;
  const key = datastore.key( [kind, id] );

  const storeObj = {
    key,
    data: store,
  };

  const response = await datastore.save(storeObj);

  return ret(res, "Store created successfully");
}

async function updateStore(req: any, res: any) {
  const owner = await getUser(req.cookies);
  const kind = "stores";
  const newStore: Store = req.body;
  const requiredFields = ["id", "name", "description", "location", "schedule"];

  const fieldAudit = checkFields(requiredFields, newStore);
  if (fieldAudit.length !== 0) {
    return res
        .status(401)
        .send(`Missing field(s) ${JSON.stringify(fieldAudit)}`)
        .end();
  }

  const id = newStore.id;
  const key = datastore.key([kind, id]);

  const [storeRet]: Store[] = await datastore.get(key);

  if (storeRet == undefined) {
    return res
        .status(401)
        .send(`Cannot find Store ${JSON.stringify(fieldAudit)}`)
        .end();
  }

  const storedStore = Object.fromEntries(
      Object.entries(storeRet).map(([key, value]) => {
        if(key === "name") return ["name", newStore.name];
        if(key === "description") return ["description", newStore.name]
        if(key ===)
        return [key, value];
      })
  )
}

async function getStores(req: any, res: any) {

}

async function checkStore( id: string ): Promise<boolean> {
  const kind = "stores";
  const key = datastore.key( [kind, id] );
  const response = await datastore.get(key);

  if (!("length" in response) || response.length != 1 || response[0] == null)
    return false;

  const [store] = response;

  if ( id !== store.id ) { return false; }

  return true;
}

  function hash256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function setUpStoreApi(app: any) {
  app.post("/api/stores", setUpStore);
  app.put("/api/stores", updateStore);
}
