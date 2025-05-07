import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number | null) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export function addComment(data: Omit<Comment, 'id'>): Promise<Comment> {
  return client.post<Comment>('/comments', data);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
