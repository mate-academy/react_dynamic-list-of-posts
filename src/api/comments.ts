import { request } from './api';
import { Comment } from '../types/Comment';

export const getPostComments = (postId: number) => {
  if (postId) {
    return request(`/comments?postId=${postId}`);
  }

  return request('/posts');
};

export const setCreateComment = (newComment: Partial<Comment>) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
