import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addComment({
  postId,
  name,
  email,
  body,
}: Comment) {
  return client.post<Comment>('/comments', {
    postId,
    name,
    email,
    body,
  });
}
