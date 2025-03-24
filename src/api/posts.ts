import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPosts(id: number) {
  return client.get<Post[]>(`/posts?userId=${id}`);
}
