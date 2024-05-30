import { client } from '../utils/fetchClient';
import { Comment as com } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<com[]>(`/comments?postId=${postId}`);
};

export const addComment = (newComment: com) => {
  return client.post<com>(`/comments`, newComment);
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
