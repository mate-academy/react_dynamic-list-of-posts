import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export function getComments(postId: number) {
  return client
    .get<Comment[]>(`/comments?postId=${postId}`)
    .then(response => response);
}
