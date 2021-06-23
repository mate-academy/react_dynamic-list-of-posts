import { get } from './api';

export const getPosts = () => get('/posts');

export function getUserPosts(userId) {
  return get(`/posts?userId=${userId}`);
}

export function getPostDetails(postId) {
  return get(`/posts/${postId}`);
}
