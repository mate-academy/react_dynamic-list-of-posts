import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = async (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = async (newComment: Comment) => {
  return client.post('/comments', newComment);
};

export const deleteComment = async (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
