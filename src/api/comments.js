import { request } from './api';

export const getPostComments = (postId) => {
  if (!postId || typeof (postId) !== 'number') {
    return 0;
  }

  return request('/comments')
    .then(comments => comments.filter(comment => comment.postId === postId));
};
