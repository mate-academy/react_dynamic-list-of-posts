import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getCommentsPost = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addCommentPost = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commId: number) => {
  return client.delete(`/comments/${commId}`);
};
