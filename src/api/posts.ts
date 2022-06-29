import { BASE_URL } from './api';

export const getUserPosts = async (userId:number) => {
  const response = await fetch(userId ? `${BASE_URL}/posts?userId=${userId}` : `${BASE_URL}/posts`);

  return response.json();
};

export const getPostDetails = async (postId:number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};

export const deletePost = async (postId:number) => {
  await fetch(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
};
