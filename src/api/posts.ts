import { request } from './api';
import { Post } from '../types/Post';

export const getUserPosts = (userId?: number): Promise<Post[]> => {
  return userId
    ? request(`/posts?userId=${userId}`)
    : request('/posts');
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
