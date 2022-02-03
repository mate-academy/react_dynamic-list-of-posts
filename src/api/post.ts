import { BASE_URL } from './api';

export const postsUrl = `${BASE_URL}/posts`;

export function request(url: string) {
  return fetch(url)
    .then(response => response.json());
}

export function getUserPosts() {
  return request(postsUrl);
}

export function getPostDetails(postId: number) {
  return request(`${postsUrl}/${postId}`);
}
