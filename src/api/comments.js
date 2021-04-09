import { BASE_URL } from './api';

export const getPostComments = (postId) => {
  const fetchedData = fetch(`${BASE_URL}/comments/`)
    .then(response => response.json())
    .then(result => result.data.filter(comment => comment.postId === +postId));

  return fetchedData;
};

export const deletePostComment = (commentId) => {
  const fetchedData = fetch(
    `${BASE_URL}/comments/${commentId}`, { method: 'DELETE' },
  );

  return fetchedData;
};

export const addNewComment = (comment) => {
  const fetchedData = fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }),
  }).then(response => response.json());

  return fetchedData;
};
