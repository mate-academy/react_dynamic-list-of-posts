/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate.academy/students-api';

enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

async function request<T>(
  url: string,
  method = RequestMethod.GET,
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options).then(response => response.json());
}

/* eslint-disable max-len */
export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, RequestMethod.POST, data),
  patch: <T>(url: string, data: any) => request<T>(url, RequestMethod.PATCH, data),
  delete: <T>(url: string) => request<T>(url, RequestMethod.DELETE),
};
