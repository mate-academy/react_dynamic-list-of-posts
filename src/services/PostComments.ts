import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.get<number>(`/comments/${commentId}`);
};

export const createComment
= ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    postId,
    name,
    email,
    body,
  });
};
