import { Comment } from '../types/Comment';
import { request } from './api';

export const getPostComments = (postId: number): Promise<Comment[]> => (
  request(`/comments?postId=${postId}`)
);

export const postComment = (newComment: Comment) => (
  request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  })
);

export const deleteComment = (commentId: number) => (
  request(`/comments/${commentId}`, {
    method: 'DELETE',
  })
);
