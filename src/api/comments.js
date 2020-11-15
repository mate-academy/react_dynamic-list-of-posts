import { BASE_URL } from './api';

export const getPostComments = postId => (
  fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(comments => comments.data
      .filter(comment => comment.postId === postId))
);

export const deletePostComment = commentId => (
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
);

export const addPostComment = (newComment, postId) => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      ...newComment,
    }),
  })
);
