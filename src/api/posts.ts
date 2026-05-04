import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPostsByUserId = async (userId: number) => {
  if (!userId) {
    return Promise.reject('No userId');
  }

  return client.get<Post[]>(`/posts?userId=${userId}`);
};
