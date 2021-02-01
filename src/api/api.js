export const BASE_URL = 'https://mate-api.herokuapp.com';
// eslint-disable-next-line
export const request = async(url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw Error;
    }

    return response.json();
  })
  .then(result => result.data);

export const remove = url => request(url, { method: 'DELETE' });

export const post = (url, data) => request(url, {
  method: 'POST',
  body: JSON.stringify(data),
});
