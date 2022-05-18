import { BASE_URL } from './api';
import { Post } from '../types';

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

export const getUserPosts = async (id: number) => {
  let allPosts = await request('/posts/');

  if (id !== 0) {
    allPosts = allPosts.filter((post: Post) => post.userId === id);
  }

  return allPosts;
};

export const getUsers = () => {
  return request('/users/');
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};
