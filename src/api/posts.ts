import { client } from '../utils/fetchClient';
import { Comment } from '../types';

export const getData = <T>(thing: string) => {
  return client.get<T[]>(`/${thing}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const postComment = (
  userId: number,
  comment: Omit<Comment, 'id'>,
): Promise<Comment> => {
  return client.post(`/comments?userId=${userId}`, comment);
};
