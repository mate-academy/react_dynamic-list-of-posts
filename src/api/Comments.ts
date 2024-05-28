import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (commentData: CommentData): Promise<Comment> => {
  return client.post<Comment>('/comments', commentData);
};

export const deleteComment = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};
