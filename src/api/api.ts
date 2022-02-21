export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, options?: {}) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error());
      }

      return response.json();
    });
};

export const getPosts = (): Promise<Post[]> => request('/posts');
