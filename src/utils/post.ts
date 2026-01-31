import { Post } from '../types/Post';
import { client } from './fetchClient';

export const getPosts = (id: number | null) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};
