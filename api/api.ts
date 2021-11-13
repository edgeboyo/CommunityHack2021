import { app } from "../app";
import { Datastore } from "@google-cloud/datastore";

import crypto from "crypto";
import { RawUser, User } from "../data/User";
import { checkFileds } from "../utils";

const datastore = new Datastore();

async function apiDebug(req: any, res: any) {
  return res.status(200).send("Nothing").end();
}

function hash256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function checkUser(
  username: string,
  password: string | undefined = undefined
): Promise<boolean> {
  const kind = "users";

  const key = datastore.key([kind, username]);

  const response = await datastore.get(key);

  if (!("length" in response) || response.length != 1 || response[0] == null)
    return false;

  const [user] = response;

  if (password != undefined) {
    const passwordHash = hash256(password);

    if (passwordHash !== user.password) {
      return false;
    }
  }

  return true;
}

async function createUser(req: any, res: any) {
  const kind = "users";

  const user: RawUser = req.body;

  const requiredFields = ["username", "email", "rawPassword"];

  const fieldAudit = checkFileds(requiredFields, user);
  if (fieldAudit.length !== 0) {
    return res
      .status(401)
      .send(`Missing field(s) ${JSON.stringify(fieldAudit)}`)
      .end();
  }

  if (await checkUser(user.username)) {
    return res.status(409).send("This user already exists").end();
  }

  const savedUser = Object.fromEntries(
    Object.entries(user).map(([key, value]) => {
      if (key == "rawPassword") return ["password", hash256(user.rawPassword)];
      return [key, value];
    })
  );

  const name = savedUser.username;

  // The Cloud Datastore key for the new entity
  const key = datastore.key([kind, name]);

  const userObj = {
    key,
    data: savedUser,
  };

  const response = await datastore.save(userObj);

  return res.status(200).send("User created successfully").end();
}

async function login(req: any, res: any) {
  const user: RawUser = req.body;

  const requiredFields = ["username", "rawPassword"];

  const fieldAudit = checkFileds(requiredFields, user);
  if (fieldAudit.length !== 0) {
    return res
      .status(401)
      .send(`Missing field(s) ${JSON.stringify(fieldAudit)}`)
      .end();
  }

  if (await checkUser(user.username, user.rawPassword)) {
    return res.status(200).send("User logged-in successfully").end();
  } else {
    return res.status(401).send("Unauthorized").end();
  }
}

export function setUpApi(app: any) {
  app.get("/api/", apiDebug);

  app.get("/api/users/", login);

  app.post("/api/users/", createUser);
}
