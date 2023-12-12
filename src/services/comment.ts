import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getCommemts(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export function createComment({
  name, body, email, postId,
}: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', {
    name, body, email, postId,
  });
}
