import { callApi } from "./util";

const AUTH_ROUTE = "/auth";

export function signOut() {
  localStorage.removeItem("token");
}

export async function signUp(username, password) {
  const body = { username, password };

  const data = await callApi(AUTH_ROUTE, "POST", body);

  if (data?.error) throw new Error(data.error);

  localStorage.setItem("token", data.token);
}