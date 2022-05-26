import { Comment } from '../types/Comment';
import { getRequest, postRequest, deleteRequest } from './api';

export const getPostCommentsById
  = async (postId: number): Promise<Array<Comment>> => {
    return getRequest(`/comments?postId=${postId}`);
  };

export const addPostCommentById
= async (
  comment: Omit<Comment, 'id'>,
): Promise<void> => {
  return postRequest('/comments', JSON.stringify(comment));
};

export const removePostCommetById
= async (commentId: number): Promise<void> => {
  return deleteRequest(`/comments/${commentId}`);
};
