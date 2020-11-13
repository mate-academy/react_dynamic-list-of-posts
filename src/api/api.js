export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = async(url, option) => {
  const result = await fetch(`${BASE_URL}${url}`, option);

  if (!result.ok) {
    throw new Error(`${result.status} - ${result.statusText}`);
  }

  return result.json();
};

export const remove = url => request(url, { method: 'DELETE' });

export const post = (url, data) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
);
