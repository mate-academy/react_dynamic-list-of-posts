import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const newComment = (comment: Partial<Comment>) => {
  return client.post('/comments', comment);
};
