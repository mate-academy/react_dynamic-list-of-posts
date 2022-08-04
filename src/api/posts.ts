import { Post } from '../types/Post';
import { request } from './api';

export const getAllPosts = () => {
  return request('/posts');
};

export const getUserPosts = (userId?: number): Promise<Post[]> => {
  if (!userId) {
    return getAllPosts();
  }

  return request(`/posts/?userId=${userId}`);
};

export const getPostDetails = (postId: number): Promise<Post> => (
  request(`/posts/${postId}`)
);
