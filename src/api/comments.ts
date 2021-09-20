import { request } from './api';

export const getPostComments = () => request('/comments/');

export const deletePostComment = (commentId: number) => request(`/comments/${commentId}`, { method: 'DELETE' });

export const addNewComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => request(`/comments?postId=${postId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
