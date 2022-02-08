import { BASE_URL } from './api';

export const getUserPosts = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return response.json();
};

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getPostById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/posts/${String(id)}`);

  return response.json();
};
