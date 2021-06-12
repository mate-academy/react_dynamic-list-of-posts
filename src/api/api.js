export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = endpoint => fetch(BASE_URL + endpoint)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  }).then(result => result.data);
