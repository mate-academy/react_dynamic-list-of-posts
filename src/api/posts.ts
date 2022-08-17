import { request } from './api';

export const getPosts = async (userId?: number): Promise<Post[]> => {
  if (userId) {
    return request(`posts?userId=${userId}`);
  }

  return request('posts');
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  return request(`posts/${postId}`);
};
