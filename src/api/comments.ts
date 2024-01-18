import { client } from '../utils/fetchClient';

import { Comment } from '../types/Comment';

export const getComments = async (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = async (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = async (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
