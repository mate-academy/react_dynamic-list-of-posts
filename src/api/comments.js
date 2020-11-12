import { BASE_URL } from './api';

export const getComments = postId => fetch(`${BASE_URL}/comments/`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(comments => comments.data
    .filter(comment => comment.postId === +postId));
