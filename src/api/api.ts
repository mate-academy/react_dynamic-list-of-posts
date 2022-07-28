import { Comment } from '../types';

export const BASE_URL = 'https://mate.academy/students-api';

export function remove(url: string) {
  return fetch(BASE_URL + url, { method: 'DELETE' })
    .then(response => response.json());
}

export const add = (url: string, data: Comment) => {
  return fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json());
};
