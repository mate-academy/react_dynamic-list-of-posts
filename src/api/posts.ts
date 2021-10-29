import { BASE_URL } from './api';

export const getData = (endPoint: string) => {
  return fetch(`${BASE_URL}${endPoint}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
};

export const getPosts = () => getData('/posts');

export const getPostDetails = (postId: number) => getData(`/posts/${postId}`);
