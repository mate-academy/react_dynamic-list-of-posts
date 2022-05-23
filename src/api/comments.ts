import { request, remove, post } from './api';

export const getPostComments = (postId: number) => (
  request(`/comments?postId=${postId}`)
    .then(comments => comments)
);

export const deleteComment = (commentId: number) => {
  remove(`/comments/${commentId}`);
};

export const addNewComment = (newComment: Partial<Comment>): Promise<Comment> => {
  return post('/comments', newComment);
};
