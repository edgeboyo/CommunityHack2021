import fetch from "node-fetch";
import { BASE_URL } from "./apiConfig";

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const requestObject = {
    username,
    email,
    rawPassword: password,
  };

  const response = await fetch(`${BASE_URL}users`, {
    method: "post",
    body: JSON.stringify(requestObject),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: any = await response.json();
  data["status"] = response.status;

  return data;
}
