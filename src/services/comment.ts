import { CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number) {
  return client.get<CommentData[]>(`/comments?postId=${postId}`);
}
