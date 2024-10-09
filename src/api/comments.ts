import { ApiPath } from '../enums/api-path.enum';
import { QueryParams } from '../enums/query-params.enum';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPost = (id: number) => {
  return client.get<Comment[]>(
    `${ApiPath.COMMENTS}?${QueryParams.POST_ID}=${id}`,
  );
};

export const addComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(ApiPath.COMMENTS, comment);
};

export const deleteComment = (id: number) => {
  return client.delete(`${ApiPath.COMMENTS}/${id}`);
};
