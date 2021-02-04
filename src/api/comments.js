import { request, post, BASE_URL } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const addPostComment = ({
  postId,
  name,
  email,
  body,
}) => post('/comments', {
  postId,
  name,
  email,
  body,
});

export const deletePostComment = postId => fetch(
  `${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  },
)
  .then(response => response.json())
  .then(result => result.data);
