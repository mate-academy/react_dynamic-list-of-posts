import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const deletComments = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const postComments = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post(`/comments`, { postId, name, email, body });
};
