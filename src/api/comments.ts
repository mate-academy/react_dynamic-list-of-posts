import { getData, removeData } from './api';

export const getAllComments = async (): Promise<Comment[]> => {
  return getData('/comments');
};

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  return getData(`/comments?postId=${postId}`);
};

export const getCommentById = async (commentId: number): Promise<Comment> => {
  return getData(`/comments/${commentId}`);
};

export const removePostComment = async (commentId: number) => {
  return removeData(`/comments/${commentId}`);
};
