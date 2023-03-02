import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const sendComment = (comment: Comment) => {
  return client.post<Comment>('/comments', comment);
};
