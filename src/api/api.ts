const BASE_URL = 'https://mate.academy/students-api';

type FetchOptions = {
  method: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

export const request = async (url: string, options?: FetchOptions) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  return response.json();
};

export const remove = (url: string) => {
  return request(url, { method: 'DELETE' });
};
