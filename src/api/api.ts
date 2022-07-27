export const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url;

  return wait(1000)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}
