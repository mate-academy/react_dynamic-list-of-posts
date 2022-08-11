import { BASE_URL } from './api';

export const request = (url: string, options = {}) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getPosts = () => request('/posts');

export const getUsers = () => request('/users');

export const getUserPosts = (userId: number) => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => request(`/posts/${postId}`);
