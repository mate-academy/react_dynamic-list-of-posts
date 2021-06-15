import { request, remove, add } from './api';

export const getPostComments = (postId) => {
  if (!postId || typeof (postId) !== 'number') {
    return 0;
  }

  const result = request('/comments')
    .then(comments => comments.filter(comment => comment.postId === postId));

  return result;
};

export const removeComment = commentId => remove(`/comments/${commentId}`);

export const addComment = options => add('/comments', options);
