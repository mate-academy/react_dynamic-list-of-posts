import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get(`/comments?postId=${postId}`);
};

export const createComment = ({
  name,
  email,
  body,
  postId,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { name, email, body, postId });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
