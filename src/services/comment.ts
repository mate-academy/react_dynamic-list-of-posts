import { Comment, NewComment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addComment(data: NewComment) {
  return client.post<Comment>(`/comments`, data);
}

export function deleteComment(postId: number) {
  return client.delete(`/comments/${postId}`);
}
