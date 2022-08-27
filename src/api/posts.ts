import { Post } from '../types/Post';

import { request } from './request';

export const getAllPosts = (): Promise<Post[]> => {
  return request('/posts');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`/posts?userId=${userId}`);
};

export const getPostById = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
