import { request } from './api';

export const getUserPosts = async (userId: number) => {
  const response = await request(`https://mate.academy/students-api/posts?userId=${userId}`);

  return response;
};

export const getPosts = async () => {
  const response = await request('/posts');

  return response;
};

export const getPostDetails = async (postId:number) => {
  const response = await request(`/posts/${postId}`);

  return response;
};
