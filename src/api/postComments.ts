import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

type NewCommentData = CommentData & { postId: number };

export const addComment = ({ postId, name, email, body }: NewCommentData) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
