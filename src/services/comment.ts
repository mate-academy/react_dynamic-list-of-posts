import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (comment: Comment) => {
  return client.post<Comment>(`/comments`, comment);
};
