import { BASE_URL } from './api';

export function getUserPosts(userId) {
  if (parseInt(userId, 10)) {
    return fetch(`${BASE_URL}/posts?userId=${userId}`)
      .then(post => post.json())
      .then(res => res.data);
  }

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
