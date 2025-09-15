import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (commentsId: number) => {
  return client.get<Comment[]>(`/comments?postId=${commentsId}`);
};

export const deleteComments = (commentsId: number) => {
  return client.delete(`/comments/${commentsId}`);
};

export const createComments = ({ postId, name, email, body }: Comment) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};
