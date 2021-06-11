import { request } from './api';

export function getUserPosts(userId) {
  return request(`/posts&userId=${userId}`);
}

export function getPosts() {
  return request('./posts');
}

export function getPost(postId) {
  return request(`/posts/${postId}`);
}
