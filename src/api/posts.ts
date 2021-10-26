import { request } from './api';

export const loadUsers = (): Promise<User[]> => {
  return request('/users');
};

export const loadUserPosts = (userId: number): Promise<Post[]> => {
  if (userId) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
};

export const loadPost = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
