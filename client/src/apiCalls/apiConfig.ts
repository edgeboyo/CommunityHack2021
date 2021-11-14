export const BASE_URL = "http://127.0.0.1:8080/api/";

export async function post(obj: Object, pathEnding: string) {
  return await fetch(`${BASE_URL}${pathEnding}`, {
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function put(obj: Object, pathEnding: string) {
  return await fetch(`${BASE_URL}${pathEnding}`, {
    method: "put",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
