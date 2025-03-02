import { callApi } from "./util";

const USER_ROUTE = "/user";

export async function getUser() {
  const data = await callApi(USER_ROUTE + "/me", "GET");

  if (data?.error) throw new Error(data.error);

  return data.user;
}

export async function getChallenger(uri) {
  const data = await callApi(USER_ROUTE + "/challenger/" + uri, "GET");

  if (data?.error) throw new Error(data.error);

  console.log(data)
  const user = await callApi(USER_ROUTE + "/" + data.user_id, "GET");
  return user.user;
}

export async function createChallenge() {
  const data = await callApi(USER_ROUTE + "/challenges", "POST");

  if (data?.error) throw new Error(data.error);

  return data;
}
