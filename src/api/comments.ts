import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUserComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const createComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, { postId, name, email, body });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
