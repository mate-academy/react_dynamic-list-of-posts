import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<any> => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return response.json();
};

export const getAllPosts = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
