import { CommentType } from '../types/Comment';
import { NewComment } from '../types/NewComment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<CommentType[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: NewComment) => {
  return client.post<CommentType>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
