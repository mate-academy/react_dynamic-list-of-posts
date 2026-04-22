import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPostsOfUser(userId: number): Promise<Post[]> {
  return client.get<Post[]>('/posts?userId=' + userId);
}
