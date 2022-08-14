import { BASE_URL } from './api';

export const getUserPosts = async (userId: number) => {
  let response;

  if (userId === 0) {
    response = await fetch(`${BASE_URL}/posts/`);
  } else {
    response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  }

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
