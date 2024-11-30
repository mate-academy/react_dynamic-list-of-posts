import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComment = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (newComment: Comment) => {
  return client.post(`/comments`, newComment);
};
