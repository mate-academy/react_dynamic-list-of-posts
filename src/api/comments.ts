import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export function addComment({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>): Promise<Comment> {
  return client.post('/comments', {
    postId,
    name,
    email,
    body,
  });
}
