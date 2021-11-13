import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore();

export async function checkLoginCookie(
  username: string,
  cookies: any
): Promise<boolean> {
  if (!("token" in cookies)) return false;
  const kind = "tokens";

  const key = await datastore.key([kind, username]);

  const [user] = await datastore.get(key);

  if (user == null) {
    return false;
  }

  if (user.token !== cookies.token) return false;

  return true;
}

export async function getUser(cookies: any): Promise<string | undefined> {
  if (!("token" in cookies)) return undefined;

  const key = datastore.key("tokens");

  const tokens = await datastore.get(key);

  const user = tokens.find((token) => token == cookies.token);

  return user?.username;
}
