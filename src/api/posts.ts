import { Post } from '../types/index';
import { client } from '../utils/fetchClient';

export const getPostsFromServer = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
