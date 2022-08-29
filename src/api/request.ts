/* eslint-disable no-cond-assign */
export const BASE_URL = 'https://mate.academy/students-api';

// type OptionsRequest = {
//   method: string;
//   headers: { 'Content-type': string; };
//   body: string;
// };

// const initialOptionsRequest = {
//   method: 'GET',
//   headers: { 'Content-type': '' },
//   body: '',
// };

export const request = async (
  url: string,
  options: any = {
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

  if (!response.headers.get('content-type')?.includes('application/json')) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Content-type is not supported');
  }

  return response.json();
};
