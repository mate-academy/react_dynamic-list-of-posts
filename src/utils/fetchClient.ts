const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function request<T>(
  url: string,
): Promise<T> {
  return wait(300)
    .then(() => fetch(BASE_URL + url))
    .then(response => response.json());
}
