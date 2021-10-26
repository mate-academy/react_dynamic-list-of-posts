const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options = {}) => {
  return fetch(`${BASE_URL}${url}`, options).then(response => response.json());
};
