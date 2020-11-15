export const BASE_URL = 'https://mate-api.herokuapp.com';

export async function request(apiSection, options) {
  const response = await fetch(`${BASE_URL}${apiSection}`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const posts = await response.json();

  return posts.data;
}

export const postRequest = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

export const removeRequest = url => request(url, {
  method: 'DELETE',
});
