import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (comment: CommentData, postId: number) => {
  const newComment: Omit<Comment, 'id'> = { ...comment, postId };

  return client.post<Comment>('/comments', newComment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
