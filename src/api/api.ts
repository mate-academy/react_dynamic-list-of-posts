const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};
