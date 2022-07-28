export const BASE_URL = 'https://mate.academy/students-api';

export function getData<T>(url: string): Promise<T> {
  return fetch(`${BASE_URL}${url}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
