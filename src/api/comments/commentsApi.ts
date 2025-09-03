import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (comment: Comment): Promise<Comment> => {
  return client.post(`/comments`, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
