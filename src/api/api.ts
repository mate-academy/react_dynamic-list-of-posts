import Comment from '../components/types/Comment';

export const BASE_URL = 'https://mate.academy/students-api';

export function get<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(res => res.json());
}

export function remove<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url, { method: 'DELETE' })
    .then(res => res.json());
}

export function post<T>(url: string, newPost: Comment): Promise<T> {
  return fetch(BASE_URL + url,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(newPost),
    }).then(res => res.json());
}
