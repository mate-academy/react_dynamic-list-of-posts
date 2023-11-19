import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

// eslint-disable-next-line
export const addComment = (comment: object) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
