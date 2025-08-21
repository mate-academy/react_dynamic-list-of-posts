import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComments(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export function createComments({
  name,
  email,
  body,
  postId,
}: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', { name, email, body, postId });
}
