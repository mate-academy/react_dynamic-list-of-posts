import { Post } from '../types/Post';
import { request } from './request';

export const getPosts = () => {
  return request<Post[]>('/posts');
};
