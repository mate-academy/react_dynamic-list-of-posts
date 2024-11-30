import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: Comment['postId']) => {
  return client.get<Comment[]>(`
/comments?postId=${postId}`);
};

export const createComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, { postId, name, email, body });
};

export const deleteComment = (commentId: Comment['id']) => {
  return client.delete(`/comments/${commentId}`);
};
