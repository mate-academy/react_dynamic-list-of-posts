import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addComment(comment: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', comment);
}

export function deleteComment(id: number) {
  return client.delete(`/comments/${id}`);
}
