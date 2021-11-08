export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string | number) => {
  return fetch(`${BASE_URL}${url}`)
    .then(responce => {
      if (!responce.ok) {
        throw new Error(`${responce.status} -- ${responce.statusText}`);
      }

      return responce.json();
    });
};
