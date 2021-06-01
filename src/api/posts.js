import { BASE_URL } from './api';

export const request = (url, options) => (
  fetch(`${BASE_URL}${url}`, options)
    .then(res => res.json())
    .then(json => json.data));

export const getPosts = () => request('/posts');
export const getPostDetails = postid => request(`/posts/${postid}`);
