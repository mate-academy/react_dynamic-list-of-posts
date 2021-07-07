import { BASE_URL } from './api';

export function getUsers() {
  return fetch(`${BASE_URL}/users/`)
    .then(res => res.json())
    .then(users => users.data);
}

export function getUserPosts(userId) {
  return fetch(`${BASE_URL}/posts`)
    .then(post => post.json())
    .then(res => res.data);
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(res => res.json())
    .then(res => res.data);
}

export function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(comments => comments.data.filter(com => com.postId === postId));
}

export function removeComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
}

export function patch(obj) {
  return fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    body: JSON.stringify({ ...obj }),
  });
}
