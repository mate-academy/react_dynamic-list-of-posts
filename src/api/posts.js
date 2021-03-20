import { BASE_URL } from './api';

export const getUserPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts`);
  const result = await response.json();
  const { data } = result;

  return data;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const result = await response.json();
  const { data } = result;

  return data;
};
