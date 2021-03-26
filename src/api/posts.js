import { BASE_URL } from './api';

export const getUserPosts = () => (
  fetch(`${BASE_URL}/posts/`)
    .then(response => response.json())
    .then(response => response.data)
);

export const getPostDetails = url => (
  fetch(`${BASE_URL}/posts/${url}`)
    .then(response => response.json())
    .then(response => response.data)
);
