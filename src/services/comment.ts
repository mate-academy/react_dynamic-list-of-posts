import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addNewComment(newComment: Omit<Comment, 'id'>) {
  return client.post<Comment>(`/comments`, newComment);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
