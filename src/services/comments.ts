import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getUserComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export function addComment(comment: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', comment);
}
