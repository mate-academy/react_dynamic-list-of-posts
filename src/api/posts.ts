import { BASE_URL } from './api';

export function getUserPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json());
}
