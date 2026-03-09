import { Comments } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comments[]>(`/comments?postId=${postId}`);
};

export const createComment = ({
  body,
  email,
  name,
  postId,
}: Omit<Comments, 'id'>) => {
  return client.post<Comments>('/comments/', { body, email, name, postId });
};

export const deleteComment = (cmtId: number) => {
  return client.delete(`/comments/${cmtId}`);
};
