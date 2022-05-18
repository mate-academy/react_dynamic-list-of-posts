export const BASE_URL = 'https://mate.academy/students-api';

export function getUserPosts(userId: string) {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
}

export function getAllPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json());
}

export function getPostDetails(postId: number) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json());
}
