import { BASE_URL } from './api';

export const request = async(path) => {
  const response = await fetch(`${BASE_URL}${path}`);
  const result = response.json();

  return result;
};

export const getAllPosts = () => request(`/posts`);

export const getUserPosts = userId => request(`/posts?userId=${userId}`);

export const getPostDetails = postId => request(`/posts/${postId}`);
