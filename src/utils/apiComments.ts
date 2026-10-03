import { Comment, CommentData } from '../types/Comment';
import { client } from './fetchClient';

export function getComments(postId: number): Promise<Comment[]> {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addComment(
  postId: number,
  comment: CommentData,
): Promise<Comment> {
  return client.post<Comment>('/comments', {
    ...comment,
    postId,
  });
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
