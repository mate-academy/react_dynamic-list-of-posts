import { FetchOptions } from '../types/types';

export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, options?: FetchOptions) => {
  // eslint-disable-next-line no-console
  console.log(`${BASE_URL}${url}`);

  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
