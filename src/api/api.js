/* eslint-disable no-console */
export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = async(url, option = { method: 'GET' }) => {
  const response = await fetch(`${BASE_URL}${url}`, option);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();

  return result.data;
};

export const remove = id => request(
  `/comments/${id}`,
  { method: 'DELETE' },
);

export const post = body => request(
  '/comments',
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  },
);
