import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export function getPostsFromUser(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}
