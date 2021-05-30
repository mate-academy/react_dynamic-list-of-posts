import { request } from './posts';

export const getPostComments = postId => (
  request(`/comments?postId=${postId}`)
);

export const removeComment = commentId => (
  request(`/comments/${commentId}`, { method: 'DELETE' })
);

export const addComment = ({ postId, name, email, body }) => (
  request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  })
);
