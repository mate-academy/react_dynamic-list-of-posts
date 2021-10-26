import { request, remove, post } from './api';

export const getPostComments = (postId: number) => (
  request(`/comments?postId=${postId}`)
    .then(comments => comments)
);

export const deleteComment = (commentId: number) => {
  remove(`/comments/${commentId}`);
};

export const addNewComment = (newComment: Comment) => {
  post('/comments', newComment);
};
