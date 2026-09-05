import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPost(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}
