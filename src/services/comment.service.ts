import { CommentData, PostComment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<PostComment[]>(`/comments?postId=${postId}`);
};

export const addPostComment = (comment: CommentData & { postId: number }) => {
  return client.post<PostComment>('/comments', comment);
};

export const deletePostComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
