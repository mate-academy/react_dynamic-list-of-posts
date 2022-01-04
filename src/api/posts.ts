import { request } from './api';

export const getUsers = (): Promise<User[]> => {
  return request('/users');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  if (userId) {
    return request(`/posts?userId=${userId}`);
  }

  return request('/posts');
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
