import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createAComment = (postId: number, data: CommentData) => {
  return client.post<Comment>('/comments', { postId, ...data });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
