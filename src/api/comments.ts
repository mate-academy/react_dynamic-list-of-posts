import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = (postId: number | undefined) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (
  postId: number | undefined,
  name: string,
  email: string,
  body: string,
) => {
  return client.post<Comment>('/comments/', {
    postId,
    name,
    email,
    body,
  });
};
