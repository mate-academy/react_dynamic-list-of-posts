import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export function getComments(id: number) {
  return client.get<Comment[]>(`/comments?postId=${id}`);
}

export function deleteComment(id: number) {
  return client.delete(`/comments/${id}`);
}

export function createComment(data: Comment) {
  return client.post<Comment>(`/comments`, data);
}
