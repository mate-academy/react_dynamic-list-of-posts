import { request } from './api';

export const loadPosts = (): Promise<Post[]> => {
  return request('posts');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`posts?userId=${userId}`);
};

export const loadPost = (postId: number): Promise<Post> => {
  return request(`posts/${postId}`);
};
