export const BASE_URL = 'https://mate.academy/students-api';

type RequestOptionsType = {
  method: 'GET' | 'POST' | 'DELETE';
  headers?: { 'Content-type': 'application/json; charset=utf-8' };
  body?: string;
};

export const request = async (
  url: string,
  options: RequestOptionsType = {
    method: 'GET',
  },
) => {
  // eslint-disable-next-line no-console
  console.log(`request to: ${BASE_URL}${url}`);

  // eslint-disable-next-line no-console
  console.log('request options:', options);

  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(
      `${response.status} - ${response.statusText}`,
    );
  }

  return response.json();
};
