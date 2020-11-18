import { request, remove, post } from './api';

export const COMMENTS_URL = '/comments';

export const getPostComments = async(postId) => {
  const comments = await request(COMMENTS_URL);

  return comments.data.filter(comment => +postId === comment.postId);
};

export const deleteComment = commentId => (
  remove(`${COMMENTS_URL}/${commentId}`)
);

export const postComment = async comment => post(COMMENTS_URL, comment);
