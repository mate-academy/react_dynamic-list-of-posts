import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export const postComment = (comment: CommentData) => {
  return client.post<Comment>('/comments', comment);
};
