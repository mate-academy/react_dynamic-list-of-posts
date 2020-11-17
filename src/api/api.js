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

export const post = (url, data) => {
  return request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data),
  });
};

export const patch = (url, data) => {
  return request(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data),
  });
};

export const remove = (url) => {
  return request(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
