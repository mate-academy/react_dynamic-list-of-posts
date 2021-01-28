import { BASE_URL } from './api';

export function getAllPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      return response.json();
    })
    .then(posts => (posts.data.filter(post => post.userId)));
}

export function getUserPosts(userId) {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      return response.json();
    })
    .then(posts => posts.data);
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      return response.json();
    });
}
