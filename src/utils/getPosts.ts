import { Post } from '../types/Post';
import { client } from './fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
