import { post } from "./apiConfig";

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

  const response = await post(requestObject, "users");

  const data: any = await response.json();
  data["status"] = response.status;

  return data;
}
