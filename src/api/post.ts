import { request } from './api';

export const loadAllPosts = (): Promise<Post[]> => {
  return request('/posts');
};

export const loadUserPosts = (userId: number): Promise<Post[]> => {
  return request(`/posts?userId=${userId}`);
};

export const loadPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};

export const loadUsers = (): Promise<User[]> => {
  return request('/users');
};
