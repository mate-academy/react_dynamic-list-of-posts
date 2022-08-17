export const BASE_URL = 'https://mate.academy/students-api';
export const ENDPOINT = {
  posts: '/posts',
  comments: '/comments',
};

// eslint-disable-next-line max-len
export const request = (url: string, errorMsg: string, options?: {}) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .catch(() => ({
      Response: 'False',
      Error: `${errorMsg}`,
    }));
};
