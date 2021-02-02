import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  let response = await fetch(`${BASE_URL}/posts`);

  response = await response.json();
  response = response.data.filter(post => post.title && post.userId);

  if (userId !== 0) {
    response = response.filter(post => post.userId === userId);
  }

  return response;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
