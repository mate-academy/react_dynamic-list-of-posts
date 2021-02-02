/* eslint-disable consistent-return */
const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = async(url, option) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, option);

    if (!response.ok) {
      throw new Error(`${response.status}---${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
