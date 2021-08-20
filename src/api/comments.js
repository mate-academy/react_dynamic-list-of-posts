import { BASE_URL } from './api';

const URL = `${BASE_URL}/comments`;

export const getPostComments = postId => (
  fetch(URL)
    .then(response => response.json())
    .then(comments => comments.data.filter(
      comment => comment.postId === +postId,
    ))
);

export const deleteCommentFromServer = commentId => (
  fetch(`${URL}/${commentId}`, {
    method: 'DELETE',
  })
);

export const postNewComment = newComment => (
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  })
);
