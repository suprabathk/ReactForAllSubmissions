import { PaginationParams } from "../types/common";
import { textFieldTypes } from "../types/formTypes";
import { Form, fieldAnswer, fieldOption, formField } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: Record<string, unknown> = {}
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
  try {
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw Error(json);
    }
  } catch (err) {
    console.log();
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

export const listForms = (pageParams: PaginationParams) => {
  return request("forms/", "GET", pageParams);
};

export const fetchFormData = (formID: number) => {
  return request(`forms/${formID}/`, "GET");
};

export const fetchFormFields = (formID: number) => {
  return request(`forms/${formID}/fields/`, "GET");
};

export const addFieldCall = (
  formID: number,
  fieldParams: {
    label: string;
    kind: formField["kind"];
    options?: [];
    meta?: { description: { fieldType: textFieldTypes } };
  }
) => {
  return request(`forms/${formID}/fields/`, "POST", fieldParams);
};

export const deleteFieldCall = (formID: number, fieldID: number) => {
  return request(`forms/${formID}/fields/${fieldID}/`, "DELETE");
};

export const deleteForm = (formID: number) => {
  return request(`forms/${formID}`, "DELETE");
};

export const updateForm = (
  formID: number,
  formParam: { title?: string; description?: string }
) => {
  return request(`forms/${formID}`, "PATCH", formParam);
};

export const updateField = (
  formID: number,
  fieldID: number,
  fieldParam: {
    label?: string;
    options?: fieldOption[];
    meta?: { description: { fieldType: textFieldTypes } };
  }
) => {
  return request(`forms/${formID}/fields/${fieldID}`, "PATCH", fieldParam);
};

export const submitAnswer = (
  formID: number,
  answers: { answers: fieldAnswer[] }
) => {
  return request(`forms/${formID}/submission/`, "POST", answers);
};

export const updateFields = (formID: number, fields: formField[]) => {
  return request(`forms/${formID}/fields/`, "PATCH", fields);
};
