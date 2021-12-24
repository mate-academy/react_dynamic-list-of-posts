import { request } from './api';

export const getUsers = (): Promise<User[]> => {
  return request('/users');
};

export const getUserPost = (userId: number): Promise<Post[]> => {
  if (!userId) {
    return request('/posts');
  }

  return request(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
