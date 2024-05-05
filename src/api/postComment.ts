import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function postComment(comment: Omit<Comment, 'id'>): Promise<Comment> {
  return client.post('/comments', comment);
}
