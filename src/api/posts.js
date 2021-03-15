import { BASE_URL } from './api';

export function request(url, options) {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => response.json())
    .then(result => result.data);
}

export const getPosts = () => request('/posts');
export const getUserPosts = userId => request(`/posts?userId=${userId}`);
export const getPostDetails = postId => request(`/posts/${postId}`);
