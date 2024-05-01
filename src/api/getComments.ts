import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number): Promise<Comment[]> {
  return client.get(`/comments?postId=${postId}`);
}
