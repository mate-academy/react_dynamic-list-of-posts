import { BASE_URL } from './api';

export const getUserPosts = async (userId = 0) => {
  let url = `${BASE_URL}/posts`;

  if (userId !== 0) {
    url = `${BASE_URL}/posts?userId=${userId}`;
  }

  const response = await fetch(url);

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const url = `${BASE_URL}/posts/${postId}`;
  const response = await fetch(url);

  return response.json();
};
