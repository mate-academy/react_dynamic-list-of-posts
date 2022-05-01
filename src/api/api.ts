export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, method?: RequestInit | undefined) => {
  return fetch(`${BASE_URL}${url}`, method)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
};
