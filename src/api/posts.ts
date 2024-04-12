import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPosts(selectedUserId: number) {
  return client.get<Post[]>(`/posts?userId=${selectedUserId}`);
}
