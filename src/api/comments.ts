import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (postId: number, comment: Comment) => {
  return client.post<Comment>(`/comments?postId=${postId}`, comment);
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
