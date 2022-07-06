import { BASE_URL } from './api';

export async function getPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json());
}

export async function getUserPosts(userId: number) {
  if (userId !== 0) {
    return getPosts();
  }

  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
}

export async function getPostDetails(postId: number) {
  return fetch(`${BASE_URL}/post/${postId}`)
    .then(response => response.json());
}
