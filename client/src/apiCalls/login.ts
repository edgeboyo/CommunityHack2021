import { get, post } from "./apiConfig";

export async function loginUser(username: string, password: string) {
  const requestObject = {
    username,
    rawPassword: password,
  };

  const response = await post(requestObject, "users/login");

  const data: any = await response.json();
  data["status"] = response.status;

  return data;
}
