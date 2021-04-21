import { COMMENTS_URL, POSTS_URL, USERS_URL } from './api';

export function getUsersPosts() {
  return fetch(POSTS_URL)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(response)));
}

export function getAllUsers() {
  return fetch(USERS_URL)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(response)));
}

export function getPostDetails(postId) {
  return fetch(`${POSTS_URL}/${postId}`)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(response)));
}

export function getPostComments(postId) {
  return fetch(COMMENTS_URL)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(response)))
    .then(response => response.data
      .filter(comment => comment.postId === postId));
}

export function addComment(data) {
  const url = COMMENTS_URL;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(url, requestOptions)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(response)));
}

export function deleteComment(id) {
  const url = `${COMMENTS_URL}/${id}`;
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(url, requestOptions)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(response)));
}
