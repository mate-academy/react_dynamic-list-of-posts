import { request } from './api';
import { Post } from '../types/posts';

export const getUserPosts = (userId?: number): Promise<Post[]> => {
  if (userId) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
