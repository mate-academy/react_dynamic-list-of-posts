import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const createComment = ({
  postId, name, email, body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
};
