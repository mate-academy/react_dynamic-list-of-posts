import { BASE_URL } from './api';

export const getUserPosts = async (userId:string) => {
  const response = await fetch(`${BASE_URL}${userId}`);

  return response.json();
};

export const getPostDetails = async (postId:number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
