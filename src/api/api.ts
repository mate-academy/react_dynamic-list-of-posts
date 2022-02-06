import { NewComment } from '../types/NewComment';

const BASE_URL = 'https://mate.academy/students-api';

export const apiRequest = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}/${url}`, options);

  return response.json();
};

export const remove = (url:string) => apiRequest(url, { method: 'DELETE' });

export const post = (url:string, data: NewComment) => {
  return apiRequest(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};
