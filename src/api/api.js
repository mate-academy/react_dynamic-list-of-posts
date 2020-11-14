/* eslint-disable arrow-body-style */
export const BASE_URL = 'https://mate-api.herokuapp.com/';

export const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    return res.json();
  });
};
