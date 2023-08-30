import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComments(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export function addComments(comment: Comment) {
  return client.post<Comment>('/comments', comment);
}
