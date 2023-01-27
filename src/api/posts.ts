import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getAllByUser(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}
