import { Comment, CommentData } from '../types';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (postId: number, comment: CommentData) => {
  return client.post<Comment>('/comments', {
    ...comment,
    postId,
  });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
