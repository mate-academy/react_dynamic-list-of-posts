import { Post } from '../types/Post';
import { client } from './fetchClient';

export function getPosts(userId: number): Promise<Post[]> {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}
