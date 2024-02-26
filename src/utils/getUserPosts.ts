import { Post } from '../types/Post';
import { client } from './fetchClient';

export function getUserPosts(userId: number) {
  return client
    .get<Post[]>(`/posts?userId=${userId}`)
    .then(response => response);
}
