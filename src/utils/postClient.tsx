import { Post } from '../types/Post';
import { client } from './fetchClient';

export const postClient = {
  get(userId: number) {
    return client.get<Post[]>(`/posts?userId=${userId}`);
  },
};
