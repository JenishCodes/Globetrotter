import { signOut } from "./auth";

const API_URL = process.env.REACT_APP_API_URL;

export const callApi = async (route, method, body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  let token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const request = {
    method,
    headers: headers,
    body: body && JSON.stringify(body),
  };
  console.log(API_URL + route);
  const res = await fetch(API_URL + route, request);

  if (!res.ok && res.status === 401) signOut();

  return await res.json();
};

export const getAPIURL = () => {
  return API_URL;
};
