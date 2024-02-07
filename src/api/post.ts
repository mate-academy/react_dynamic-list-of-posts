import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return client.get(`/posts?userId=${userId}`);
};
