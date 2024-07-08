import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPostsByUserId = (userId: number) =>
  client.get<Post[]>(`/posts?userId=${userId}`);
