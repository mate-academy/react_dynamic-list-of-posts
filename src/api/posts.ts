import { BASE_URL } from './api';

export function getUserPosts(userId:number) {
  return fetch(userId ? `${BASE_URL}/posts?userId=${userId}` : `${BASE_URL}/posts`)
    .then(response => response.json());
}

export function getPostDetails(postId:number) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
}

export function getUsers() {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json());
}
