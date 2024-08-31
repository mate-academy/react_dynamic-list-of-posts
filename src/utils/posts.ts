import { Post } from '../types';
import { client } from './fetchClient';

export function getUserPosts(userId: number): Promise<Post[]> {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}
