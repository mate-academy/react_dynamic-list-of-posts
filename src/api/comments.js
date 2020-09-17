import { BASE_URL } from './api';

export const request = (path, options) => fetch(`${BASE_URL}${path}`, options)
  .then(response => response.json())
  .then(result => result.data);

export const getPostComments = selectedPostId => request('/comments')
  .then(resultArr => resultArr.filter(
    item => item.postId === selectedPostId,
  ));

export const deleteComment = commentId => request(`/comments/${commentId}`, {
  method: 'DELETE',
});

export const addComment = (postId, name, email, body) => request(`/comments`, {
  method: 'POST',
  body: JSON.stringify({
    postId,
    name,
    email,
    body,
  }),
});
