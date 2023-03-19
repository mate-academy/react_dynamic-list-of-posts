import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (id: number): Promise<Post[]> => {
  return client.get(`/posts?userId=${id}`);
};
