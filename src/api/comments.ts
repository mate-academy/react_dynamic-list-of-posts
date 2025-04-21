import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export function addComment({ name, email, postId, body }: Omit<Comment, 'id'>) {
  return client.post<Comment>(`/comments`, { name, email, postId, body });
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
