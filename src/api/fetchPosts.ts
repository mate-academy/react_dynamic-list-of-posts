import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId?: number) => {
  const query = userId ? `?userId=${userId}` : '';

  return client.get<Post[]>(`/posts${query}`);
};
