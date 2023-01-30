import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};
