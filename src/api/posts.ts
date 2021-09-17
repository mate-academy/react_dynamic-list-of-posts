import { request } from './api';

export const getAllPosts = (): Promise<Post[]> => {
  return request('/posts');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
