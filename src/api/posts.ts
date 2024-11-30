import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}
