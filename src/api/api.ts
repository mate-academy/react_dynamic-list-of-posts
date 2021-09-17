export const BASE_URL = 'https://mate.academy/students-api';

export const request = async (url:string, item = {}) => {
  const response = await fetch(`${BASE_URL}/${url}`, item);

  return response.json();
};
