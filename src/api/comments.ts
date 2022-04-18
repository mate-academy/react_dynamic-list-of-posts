import { Comment } from '../types/comment';
import { request } from './api';

export const getPostComments = (postId: number) => request(`/comments?postId=${postId}`);

export const addComment = ({
  postId, name, email, body,
}: Comment) => request('/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId,
    name,
    email,
    body,
  }),
});

export const removeComment = (commentId: number) => request(`/comments/${commentId}`, {
  method: 'DELETE',
});
