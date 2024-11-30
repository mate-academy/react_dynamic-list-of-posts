import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPostsFromServer = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
