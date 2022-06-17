// Api requests
import { apiRequest, remove, post } from './api';
// Types
import { Comment } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return apiRequest('comments')
    .then(comments => comments.filter((comment: Comment) => comment.postId === postId));
};

export const deleteComment = (commentId: number) => remove(`comments/${commentId}`);

export const createComment = (postId: number, name: string, email: string, body:string) => {
  return post('comments', {
    postId,
    name,
    email,
    body,
  });
};
