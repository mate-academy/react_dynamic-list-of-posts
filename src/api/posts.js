import { BASE_URL } from './api';

export const getUserPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts`);
  const responseJSON = await response.json();
  const { data } = responseJSON;

  return data;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const data = await response.json();

  return data;
};
