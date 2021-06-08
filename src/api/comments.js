import { get, remove, post } from './api';

export const getComments = selectedPostId => get(`/comments`)
  .then((allComments) => {
    const result = allComments
      .filter(comment => comment.postId === selectedPostId);

    return result;
  });

export const deleteComment = commentId => remove(`/comments/${commentId}`);

export const postComment = ({
  id,
  postId,
  name,
  email,
  body,
  createdAt,
  updatedAt,
}) => post(`/comments`, {
  id,
  postId,
  name,
  email,
  body,
  createdAt,
  updatedAt,
});
