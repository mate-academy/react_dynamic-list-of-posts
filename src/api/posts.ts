import { BASE_URL } from './api';

export const requestPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};
