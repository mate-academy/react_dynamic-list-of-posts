export const BASE_URL = 'https://mate.academy/students-api';
export const ENDPOINTS = {
  posts: '/posts',
  comments: '/comments',
};

export const request = <T>(query: string, options = {}): Promise<T> => {
  return fetch(`${BASE_URL}${query}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      return res.json();
    })
    .catch((err) => ({
      Response: 'False',
      Error: `${err}`,
    }));
};
