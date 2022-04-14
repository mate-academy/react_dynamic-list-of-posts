const BASE_URL = 'https://mate.academy/students-api';

export const request = (url:string, method?:RequestInit) => {
  return fetch(`${BASE_URL}${url}`, method).then(response => response.json());
};
