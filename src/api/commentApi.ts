import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostCommentsFromServer = (
  postId: number,
): Promise<Comment[]> => {
  return client.get<Comment[]>('/comments?postId=' + postId);
};

export const deleteCommentFromServer = (
  commentId: number,
): Promise<unknown> => {
  return client.delete(`/comments/${commentId}`);
};
