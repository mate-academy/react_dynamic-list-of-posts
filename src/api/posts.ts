import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: string) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
