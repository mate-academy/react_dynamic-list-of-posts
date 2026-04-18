import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const createComment = (comment: Comment) => {
  return client.post<Omit<Comment, 'id'>>('/comments', comment);
};
