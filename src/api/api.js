export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = async(url, options) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Failed to load data ${url}`);
  }

  const body = await response.json();

  return body.data || body;
};

export const save = (url, data) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);

export const remove = url => request(url, { method: 'DELETE' });
