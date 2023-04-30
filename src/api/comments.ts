import { client } from '../utils/fetchClient';
import { CommentData, CommentType } from '../types/CommentType';

export const getComments = (postId: number) => {
  return client.get<CommentType[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (data: CommentData) => {
  return client.post<CommentType>('/comments/', { ...data });
};
