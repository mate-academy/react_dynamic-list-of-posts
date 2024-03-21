import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComment(id: number) {
  return client.delete(`/comments/${id}`);
}

export function createComment(data: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', data);
}
