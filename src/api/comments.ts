import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (
  postId: number, name: string, email: string, body: string,
) => {
  return client.post<Comment>('/comments', {
    postId,
    name,
    email,
    body,
  });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
