import { BASE_URL } from './api';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then(response => response.json());

export const getPosts = () => request('/posts')
  .then(posts => posts.data);

export const getPostDetails = postId => request(`/posts/${postId}`)
  .then(post => post.data);
