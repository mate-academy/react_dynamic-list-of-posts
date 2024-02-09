import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(url: string) {
  return client.get<Comment[]>(url);
}

export function deleteComment(commentId: string) {
  return client.delete(commentId);
}

export function createComment({
  postId, name, email, body,
}: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
}
