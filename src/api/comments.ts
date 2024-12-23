import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { COMMENTS } from '../constans/comments';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`${COMMENTS}?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`${COMMENTS}${commentId}`);
};

export const addComment = (newComment: CommentData) => {
  return client.post<Comment>(`${COMMENTS}`, newComment);
};
