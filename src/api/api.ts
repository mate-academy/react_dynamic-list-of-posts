const BASE_URL = 'https://mate.academy/students-api';

export function getData<T>(url: string, option = {}): Promise<T> {
  return fetch(BASE_URL + url, option)
    .then(response => response.json());
}
