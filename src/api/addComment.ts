import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function addComment(comment: Omit<Comment, 'id'>) {
  return client.post('/comments', { ...comment });
}
