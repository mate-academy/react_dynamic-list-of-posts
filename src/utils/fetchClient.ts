import { Comment } from '../types/Comment';

const BASE_URL = 'https://mate.academy/students-api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Comment | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Unable to connect from the server: 
        - response status = ${response.status};
        - status text = ${response.statusText}`);
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: Comment) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: Comment) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
