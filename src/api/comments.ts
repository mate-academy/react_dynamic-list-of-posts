import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComment = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deletePostComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};
