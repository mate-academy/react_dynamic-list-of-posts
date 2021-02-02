import { BASE_URL } from './api';

export function getCommentsForPost(postId) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      return response.json();
    })
    .then(comments => (comments.data || []));
}

export function deleteComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function addComment(comment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
}
