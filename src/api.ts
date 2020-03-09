export const API_URL = 'https://jsonplaceholder.typicode.com/';

export function getData<T>(parameter: string): Promise<T> {
  return fetch(`${API_URL}${parameter}`)
    .then(response => response.json());
}
