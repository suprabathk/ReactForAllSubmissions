import { Form } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {}
) => {
  let url: string;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }
  // Basic Auth
  // const auth = `Basic ${window.btoa("suprabath:mySwagger123")}`;

  // Token Auth
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + localStorage.getItem("token") : "";
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw Error(json);
  }
};

export const createForm = (form: Form) => {
  return request("forms/", "POST", form);
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("users/me/", "GET", {});
};

export const listForms = () => {
  return request("forms/", "GET");
};
