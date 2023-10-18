import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function createComment(postId: number, commentData: CommentData) {
  return client.post<Comment>('/comments', { postId, ...commentData });
}

export function removeComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
