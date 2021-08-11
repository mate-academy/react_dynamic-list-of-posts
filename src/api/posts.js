import { request } from './api';

export function getUserPosts(userId) {
  return userId !== 0 ? request(`/posts?userId=${userId}`) : request('/posts');
}

export function getPostDetails(id) {
  return request(`/posts/${id}`);
}
