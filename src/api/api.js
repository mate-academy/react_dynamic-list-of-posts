export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = async(url, options) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`${response.status}-${response.statusText}`);
  }

  return response.json();
};

export const remove = url => request(url, { method: 'DELETE' });
