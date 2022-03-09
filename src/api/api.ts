export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(url)
    .then(responce => responce.json());
};
