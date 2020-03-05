const API_URL_BASE = 'https://jsonplaceholder.typicode.com/';

export function getData<T>(endPath: string): Promise<T> {
  return fetch(API_URL_BASE + endPath)
    .then(response => response.json());
}
