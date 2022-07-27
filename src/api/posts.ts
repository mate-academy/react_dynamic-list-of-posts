import { get } from './api';
import { Post } from '../types/Post';

export function getUserPosts(userId: number) {
  if (userId === 0) {
    return get<Post[]>('/posts');
  }

  return get<Post[]>(`/posts?userId=${userId}`);
}
