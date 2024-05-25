import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const addComment = (commentData: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments/', { ...commentData });
};
