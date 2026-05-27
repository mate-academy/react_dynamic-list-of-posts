import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPostsByUser = (userId: number) =>
  client.get<Post[]>(`/posts?userId=${userId}`);
