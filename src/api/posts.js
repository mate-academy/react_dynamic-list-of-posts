import { BASE_URL } from './api';

export function getAllPosts() {
  return fetch(`${BASE_URL}/posts/`)
    .then(promise => promise.json())
    .then(result => result.data);
}
