import { BASE_URL } from './api';

export function getPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUserPosts(userId) {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(result => (userId !== '0'
      ? result.data.filter(post => post.userId === +userId)
      : result.data));
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(result => result.data
      .filter(comment => comment.postId === +postId));
}

export function deleteComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}/`, {
    method: 'DELETE',
  })
    .then(response => response.json());
}

export function addComment(postId, name, email, body) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
