import { request, remove, post } from './api';

const query = '/comments';

export function getComments(postId) {
  return request(query)
    .then((result) => {
      const postComments = result.filter(comment => (
        comment.postId === postId
      ));

      return postComments;
    });
}

export function removeComment(id) {
  return remove(query, id);
}

export function addComment(body) {
  return post(query, body)
    .then(response => response.json())
    .then(result => result.data);
}
