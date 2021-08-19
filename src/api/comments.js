import { BASE_URL } from './api';

export const getPostComments = (postId) => {
  const url = `${BASE_URL}/comments`;

  return fetch(url)
    .then(response => response.json())
    .then(comments => comments.data.filter(
      comment => comment.postId === +postId,
    ));
};
