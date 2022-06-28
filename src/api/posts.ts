import { BASE_URL } from './api';

export function getUserPosts(userId: number) {
  let url = `${BASE_URL}/posts?userId=${userId}`;

  if (userId === 0) {
    url = `${BASE_URL}/posts`;
  }

  return fetch(url)
    .then(response => response.json());
}

export function getPostDetails(postId: number) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
}

export function getPostComments(postId: number) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
}
