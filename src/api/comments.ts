import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function postComment(comment: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', comment);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
