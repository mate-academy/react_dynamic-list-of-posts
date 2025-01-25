import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const postComment = (
  { name, email, body }: CommentData,
  postId: number,
) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
