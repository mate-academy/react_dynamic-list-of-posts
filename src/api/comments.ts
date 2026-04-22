import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (postId: number, comment: CommentData) => {
  const { name, email, body } = comment;

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
