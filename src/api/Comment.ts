import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComments = (
  {
    postId, name, email, body,
  }: Omit<Comment, 'id'>,
) => {
  return client.post<Comment>('/Comments', {
    postId, name, email, body,
  });
};

export const delComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
