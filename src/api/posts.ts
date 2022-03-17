import { getRequest } from './api';

export const getPosts = async (): Promise<Post[]> => getRequest('/posts');

export const getUserPosts = async (userId: number): Promise<Post[]> => (
  getRequest(`/posts?userId=${userId}`)
);

export const getPostDetails = async (postId: number): Promise<Post> => (
  getRequest(`/posts/${postId}`)
);
