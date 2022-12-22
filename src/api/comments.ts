import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (comment: Comment) => {
  return client.post<Comment>('/comments', comment);
};

export const postComment = (comment: Comment) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = (idComment: number) => {
  return client.delete(`/comments/${idComment}`);
};
