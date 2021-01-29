export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = async(url, options) => {
  const response = await fetch(`${BASE_URL}${url}`);
  const result = await response.json();

  return result.data;
};
