import { request } from './api';

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  return request(`/posts?userId=${userId}`);
};

export const getPosts = async (): Promise<Post[]> => {
  return request('/posts');
};

export const getPostDetails = async (postId: string): Promise<Post> => {
  return request(`/posts/${postId}`);
};
