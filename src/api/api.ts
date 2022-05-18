const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, option?: RequestInit | undefined) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};
