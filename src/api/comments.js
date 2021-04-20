import { BASE_URL, request } from './api';

export function getPostComments(postId) {
  return request(`${BASE_URL}/comments`)
    .then(comments => comments.filter(comment => (
      comment.postId === postId
    )));
}
