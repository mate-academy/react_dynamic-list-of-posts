import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number | null) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
