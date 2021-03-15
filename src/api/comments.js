import { request } from './posts';

const remove = url => request(url, { method: 'DELETE' });

export const getPostComments = postId => request(`/comments?postId=${postId}`);
export const removeComment = commentId => remove(`/comments/${commentId}`);
export const createComment = (
  { postId, name, email, body },
) => request(`/comments`, {
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
});
