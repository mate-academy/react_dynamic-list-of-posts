export const BASE_URL = 'https://mate.academy/students-api';

export const getData = <T> (url: string): Promise<T> => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
