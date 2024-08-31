import { Comment, CommentData } from '../types';
import { client } from './fetchClient';

export function getPostComments(postId: number): Promise<Comment[]> {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function createComment(
  comment: CommentData & { postId: number },
): Promise<Comment> {
  return client.post(`/comments`, comment);
}

export function deleteComment(commentId: number): Promise<unknown> {
  return client.delete(`/comments/${commentId}`);
}
