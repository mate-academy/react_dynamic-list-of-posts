import { get } from './api';
import { Comment } from '../types/Comment';

export function getPostComments(userId: number) {
  if (userId === 0) {
    return get<Comment[]>('/comments');
  }

  return get<Comment[]>(`/comments?postId=${userId}`);
}
