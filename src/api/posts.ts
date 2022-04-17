import { Post } from '../types/Post';
import { request } from './api';

export const getAllPosts = (endpoint?: string) => {
  if (endpoint) {
    return request(`/posts${endpoint}`);
  }

  return request('/posts');
};

export const getUserPosts = (userId?: number): Promise<Post[]> => {
  if (!userId) {
    return getAllPosts();
  }

  return getAllPosts(`/?userId=${userId}`);
};

export const getPostDetails = (postId: number): Promise<Post> => (
  getAllPosts(`/${postId}`)
);
