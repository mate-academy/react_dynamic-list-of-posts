import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addComment = (data: Comment) => {
  return client.post<Comment>('/comments', data);
};

export const removeComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
