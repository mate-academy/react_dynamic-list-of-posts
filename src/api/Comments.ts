import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (comment: Comment) => {
  return client.post<Comment>('/comments', comment);
};
