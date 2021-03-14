import { BASE_URL, request } from './api';

export const getPostComments = postId => request(
  `${BASE_URL}/comments`,
)
  .then(result => result.data.filter(comment => comment.postId === postId));

export const removePostComments = commentId => request(
  `${BASE_URL}/comments/${commentId}`, { method: 'Delete' },
);

export const addNewComment = (postId, name, email, body) => request(
  `${BASE_URL}/comments`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  },
);
