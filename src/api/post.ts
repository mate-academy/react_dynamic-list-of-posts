import { request } from './api';

export const getAllPosts = () => request('/posts');

export const getUserPosts = (userId: number) => {
  if (userId !== 0) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
};

export const getPostDetails = async (detailId: number) => {
  const response = await request(`/comments?postId=${detailId}`);

  return response;
};
