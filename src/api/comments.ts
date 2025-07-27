import { PostComment } from '../types/PostComment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<PostComment[]>(`/comments?postId=${postId}`);
};

export const addComment = (commentData: Omit<PostComment, 'id'>) => {
  return client.post<PostComment>(`/comments`, commentData);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
