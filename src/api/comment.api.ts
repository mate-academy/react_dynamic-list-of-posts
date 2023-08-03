import { client } from '../utils/fetchClient';
import { IComment } from '../models/IComment';
import { ApiEndpoint } from '../utils/constants';

export const getCommentsByPost = (postId: number) => {
  return client.get<IComment[]>(ApiEndpoint.GetCommentsByPost + postId);
};

export const deleteCommentById = (commentId: number) => {
  return client.delete(ApiEndpoint.DeleteCommentById + commentId);
};

export const postComment = (body: Omit<IComment, 'id'>) => {
  return client.post<IComment>(ApiEndpoint.PostComment, body);
};
