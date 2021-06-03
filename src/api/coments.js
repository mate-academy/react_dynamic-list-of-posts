import { request, remove, post } from './api';

const endPoint = '/comments';

export function getPostComments(postId) {
  return request(endPoint)
    .then((result) => {
      const postComments = result.filter(comment => (
        comment.postId === postId
      ));

      return postComments;
    });
}

export function deleteComment(commentId) {
  return remove(endPoint, commentId);
}

export function addComment(body) {
  return post(endPoint, body)
    .then(response => response.json())
    .then(result => result.data);
}
