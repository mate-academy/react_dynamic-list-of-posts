import { request } from './api';

export const getUserPosts = (userId: number) => {
  return request(`/posts?userId=${userId}`);
};
