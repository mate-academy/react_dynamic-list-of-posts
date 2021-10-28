export const BASE_URL = 'https://mate.academy/students-api';

export function getData<T>(url: string, options = {}): Promise<T> {
  return fetch(BASE_URL + url, options)
    .then(response => response.json());
}
