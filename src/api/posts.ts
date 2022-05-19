import { BASE_URL } from './api';

export const request = (
  url: string,
  option?: RequestInit | undefined,
) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getUserPosts = (id: number) => {
  return request(`/posts?userId=${id}`);
};

export const getPosts = () => {
  return request('/posts/');
};

export const getUsers = () => {
  return request('/users/');
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};
