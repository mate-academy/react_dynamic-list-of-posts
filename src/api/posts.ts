import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (id: number | undefined) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};
