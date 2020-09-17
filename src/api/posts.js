import { BASE_URL } from './api';

export const getPosts = () => fetch(`${BASE_URL}posts/`)
  .then(response => response.json())
  .then(result => result.data);

export const getPostDetails = postId => fetch(`${BASE_URL}posts/${postId}`)
  .then(response => response.json())
  .then(result => result.data);
