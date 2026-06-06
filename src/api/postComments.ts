import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: CommentData & { postId: number }) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
