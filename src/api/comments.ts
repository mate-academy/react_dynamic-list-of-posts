import { removeRequest, getRequest, postRequest } from './api';

export const getPostComments = async (postId: number): Promise<Comment[]> => (
  getRequest(`/comments?postId=${postId}`)
);

export const removePostComment = async (commentId: number) => (
  removeRequest(`/comments/${commentId}`)
);

export const postComment = async (comment: PostComment) => (
  postRequest('/comments', comment)
);