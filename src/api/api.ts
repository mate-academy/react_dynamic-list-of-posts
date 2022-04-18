const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, options = {}) => {
  return fetch(BASE_URL + url, options)
    .then(response => response.json())
    .then(responce => {
      if (responce.Error) {
        throw new Error(`${responce.status} - ${responce.statusText}`);
      }

      return responce;
    });
};
