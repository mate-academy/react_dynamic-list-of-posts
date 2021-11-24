import { BASE_URL, request } from './api';

export const getAllPosts = async () => {
  return request(`${BASE_URL}/posts`);
};

export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  return request(`${BASE_URL}/posts?userId=${userId}`);
};

export const getPostDetailsByPostId = (postId: number): Promise<Post> => {
  return request(`${BASE_URL}/posts/${postId}`);
};
