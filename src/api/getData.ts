export function getData <T>(API: string): Promise<T[]> {
  return fetch(API)
    .then(response => response.json())
    .catch(error => error);
}
