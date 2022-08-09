import { request } from './api';

export const loadPosts = (): Promise<Post[]> => {
  return request('posts');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`post?userId=${userId}`);
};

export const loadPost = (postId: number): Promise<Post> => {
  return request(`posts/${postId}`);
};
