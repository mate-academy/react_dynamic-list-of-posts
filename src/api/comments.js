import { BASE_URL, request } from './api';

export function getPostComments(postId) {
  return request(`${BASE_URL}/comments`)
    .then(comments => comments.filter(comment => (
      postId === comment.postId
    )));
}

export function deletePostComment(commentId) {
  return request(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function addPostComment(comment) {
  return request(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
}
