import { app } from "../app";
import { Datastore } from "@google-cloud/datastore";

import crypto from "crypto";
import { RawUser, User } from "../data/User";
import { checkFields, ret } from "../utils";

const datastore = new Datastore();

async function apiDebug(req: any, res: any) {
  return ret(res, "Nothing");
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

async function updateUser(req: any, res: any) {
  const user = req.body;

  const requiredFields = ["username", "rawPassword"];

  const fieldAudit = checkFields(requiredFields, user);
  if (fieldAudit.length !== 0) {
    return res
      .status(401)
      .send(`Missing field(s) ${JSON.stringify(fieldAudit)}`)
      .end();
  }

  checkUser(user.username, user.rawPassword);

  if (!(await checkUser(user.username, user.rawPassword))) {
    return ret(res, "Unauthorized", 401);
  }

  const kind = "users";

  const key = datastore.key([kind, user.username]);

  const [userRet]: User[] = await datastore.get(key);

  const newObject = Object.fromEntries(
    Object.entries(userRet).map(([key, value]) => {
      if (key === "rawPassword") return ["password", value];
      if (key in user) return [key, user[key]];
      return [key, value];
    })
  );

  if ("newPassword" in user) {
    newObject["password"] = hash256(user["newPassword"]);
  }

  await datastore.save({ key, data: newObject });

  return ret(res, "User updated successfully");
}

async function createUser(req: any, res: any) {
  const kind = "users";

  const user: RawUser = req.body;

  const requiredFields = ["username", "email", "rawPassword"];

  const fieldAudit = checkFields(requiredFields, user);
  if (fieldAudit.length !== 0) {
    return res
      .status(401)
      .send(`Missing field(s) ${JSON.stringify(fieldAudit)}`)
      .end();
  }

  if (await checkUser(user.username)) {
    return ret(res, "This user already exists", 409);
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

  return ret(res, "User created successfully");
}

async function login(req: any, res: any) {
  const user: RawUser = req.body;

  const requiredFields = ["username", "rawPassword"];

  const fieldAudit = checkFields(requiredFields, user);
  if (fieldAudit.length !== 0) {
    return ret(res, `Missing field(s) ${JSON.stringify(fieldAudit)}`, 401);
  }

  if (await checkUser(user.username, user.rawPassword)) {
    return ret(res, "User logged-in successfully");
  } else {
    return ret(res, "Unauthorized", 401);
  }
}

export function setUpUserApi(app: any) {
  app.get("/api/", apiDebug);

  app.get("/api/users/", login);

  app.post("/api/users/", createUser);

  app.put("/api/users/", updateUser);
}
