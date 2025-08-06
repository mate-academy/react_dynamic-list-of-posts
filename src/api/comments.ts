import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = () => {
  return client.get<Comment[]>('/comments');
};

export const addComment = (comment: CommentData & { postId: number }) => {
  return client.post<Comment>('/comments', comment);
};

export const updateComment = (
  commentId: number,
  updatedComment: Partial<Comment>,
) => {
  return client.patch<Comment>(`/comments/${commentId}`, updatedComment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
