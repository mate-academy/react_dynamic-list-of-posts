import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPosts(userId: number): Promise<Post[]> {
  return client.get(`/posts?userId=${userId}`);
}
