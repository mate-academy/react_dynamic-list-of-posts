import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (newComment: CommentData, postId: number) => {
  return client.post<Comment>('/comments', {
    ...newComment,
    postId,
  });
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
