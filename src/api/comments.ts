import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (
  email: string, name: string, body: string, postId: number,
) => {
  return client.post<Comment>('/comments', {
    email,
    name,
    body,
    postId,
  });
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
