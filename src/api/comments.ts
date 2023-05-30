import { client } from '../utils/fetchClient';
import { Comment } from '../types/index';

export const getCommentsFromServer = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const removeCommentOnServer = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addCommentOnServer = (
  data: Omit<Comment, 'id'>,
):Promise<Comment> => {
  return client.post('/comments', data);
};
