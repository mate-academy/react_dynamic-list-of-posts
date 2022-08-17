import { Post } from '../types/Post';

import { request } from './request';

export const getAllPosts = (): Promise<Post[]> => {
  return request('/posts');
};
