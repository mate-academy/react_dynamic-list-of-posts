import { Comment as CommentType, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number | undefined) => {
  return client.get<CommentType[]>(`/comments?postId=${postId}`);
};

export const createComment = (comment: CommentData) => {
  return client.post<CommentType>('/comments', comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
