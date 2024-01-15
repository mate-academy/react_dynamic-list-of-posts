import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostCommentsList = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteCommentItem = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
