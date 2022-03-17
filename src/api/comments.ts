import { deleteRequest, getRequest, postRequest } from './api';

export const getPostComments = async (postId: number): Promise<Comment[]> => (
  getRequest(`/comments?postId=${postId}`)
);

export const deletePostComment = async (commentId: number) => (
  deleteRequest(`/comments/${commentId}`)
);

export const postComment = async (commentBody: CommentToPost) => (
  postRequest('/comments', commentBody)
);
