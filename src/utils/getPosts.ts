import { client } from './fetchClient';
import { Post } from '../types';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
