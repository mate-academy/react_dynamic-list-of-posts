import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export async function getPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}
