import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getCommentsFromPostId(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function postComment(data: CommentData, postId: number) {
  return client.post<Comment>(`/comments`, { ...data, postId });
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
