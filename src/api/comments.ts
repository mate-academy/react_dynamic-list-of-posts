import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = ({
  postId,
  body,
  name,
  email,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, { postId, name, email, body });
};
