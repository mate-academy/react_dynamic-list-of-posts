import { get, post, remove } from './api';
import { Comment } from '../types/Comment';

export function getPostComments(userId: number) {
  if (userId === 0) {
    return get<Comment[]>('/comments', { method: 'GET' });
  }

  return get<Comment[]>(`/comments?postId=${userId}`, { method: 'GET' });
}

export function setPostComent(data: Comment) {
  return post('/comments', data);
}

export function deletePostComent(commentId: number) {
  return remove(`/comments/${commentId}`);
}
