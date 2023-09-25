import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (data: {
  postId: number,
  name: string,
  email: string,
  body: string,
}) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
