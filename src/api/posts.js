import { BASE_URL } from './api';

function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getAllPosts() {
  return request('/posts');
}

export function getUserPosts(userId) {
  return request(`/posts?userId=${userId}`);
}

export function getPostDetails(postId) {
  return request(`/posts/${postId}`);
}

// `/posts?userId=${userId}`
