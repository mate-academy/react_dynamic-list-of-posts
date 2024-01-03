import { client } from '../libs/utils/fetchClient';
import { Post } from '../libs/types';

export const loadPosts = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
