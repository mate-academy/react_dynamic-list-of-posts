import { Data } from '../types/Data';
import { Options } from '../types/Options';

export const BASE_URL = 'https://mate.academy/students-api';

export function request(url: string, options?: Options) {
  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
}

export function post(url: string, data: Data) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
}

export function remove(url: string) {
  return request(url, { method: 'DELETE' });
}
