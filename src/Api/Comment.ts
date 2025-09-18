import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const createComments = ({
  name,
  email,
  body,
  postId,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { name, email, body, postId });
};

export const deleteComments = (id: number) => {
  return client.delete(`/comments/${id}`);
};
