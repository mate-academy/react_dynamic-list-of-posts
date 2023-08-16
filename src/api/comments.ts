import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (
  {
    email,
    name,
    postId,
    body,
  }: Omit<Comment, 'id'>,
) => {
  return client.post<Comment>('/comments', {
    email, name, postId, body,
  });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
