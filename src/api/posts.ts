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

export const getUsers = () => getData('/users');

export const getUserPosts = (userId: number) => getData(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => getData(`/posts/${postId}`);
