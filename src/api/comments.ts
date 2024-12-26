import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { ENDPOINTS } from '../helpers/endPointsHelper';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`${ENDPOINTS.comments}?postId=${postId}`);
};

export const createComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`${ENDPOINTS.comments}`, comment);
};

export const editComment = (comment: Comment) => {
  return client.patch<Comment>(`${ENDPOINTS.comments}/${comment.id}`, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`${ENDPOINTS.comments}/${commentId}`);
};
