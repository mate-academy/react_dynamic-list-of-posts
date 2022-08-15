import { request } from './api';

export function getUserPosts(userId: string) {
  return request(`/posts?userId=${userId}`);
}

export function getAllPosts() {
  return request('/posts');
}

export function getPostDetails(postId: number) {
  return request(`/posts/${postId}`);
}
