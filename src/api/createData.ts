import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const createComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};
