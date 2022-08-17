import { Post } from '../types/Post';

import { request } from './request';

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`/posts?userId=${userId}`);
};
