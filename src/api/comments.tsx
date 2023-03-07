import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (comment: Comment) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteCommentById = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
