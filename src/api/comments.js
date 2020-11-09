import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then((comments) => {
    if (postId) {
      return comments.data.filter(comment => comment.postId === postId);
    }

    return comments.data;
  });

export const removeComment = commentId => fetch(
  `${BASE_URL}/comments/${commentId}`,
  {
    method: 'DELETE',
  },
);

export const addComment = newComment => fetch(
  `${BASE_URL}/comments`,
  {
    method: 'POST',
    body: JSON.stringify(newComment),
  },
)
  .then(response => response.json())
  .then(comments => comments.data);
