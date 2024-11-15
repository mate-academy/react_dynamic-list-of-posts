import { ApiPath } from '../enums/ApiPath';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const addComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`${ApiPath.COMMENTS_PATH}`, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`${ApiPath.COMMENTS_PATH}/${commentId}`);
};
