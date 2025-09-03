import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPostByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
