import { BASE_URL } from './api';

export const request = async (baseUrl: string) => {
  const response = await fetch(baseUrl);

  return response.json();
};

export const getUserPosts = () => request(`${BASE_URL}/posts`);

export const getPostDetails = (postId: number) => request(`${BASE_URL}/posts/${postId}`);
