import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`//comments?postId=${postId}`);
};

export const postComment = (comment: CommentData, postId: number) => {
  return client.post<Comment>('/comments', {
    postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
  });
};

export const removeComment = (commentId: number) => {
  return client.delete(`//comments/${commentId}`);
};
