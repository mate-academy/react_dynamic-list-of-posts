export const BASE_URL = 'https://mate.academy/students-api';

export type Options = {
  method: 'GET' | 'POST' | 'DELETE',
  headers?: { 'Content-type': string },
  body?: string,
};

export function get<T>(url: string, option: Options): Promise<T> {
  const fullURL = BASE_URL + url;

  return fetch(fullURL, option)
    .then(res => res.json());
}

export function post(url: string, data: unknown) {
  return get(`${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
}

export function remove(url: string) {
  return get(url, { method: 'DELETE' });
}
