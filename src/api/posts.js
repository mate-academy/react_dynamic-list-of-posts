import { request } from './api';

export function getUserPosts(userId) {
  return userId === 0
    ? request(`/posts`)
    : request(`/posts`)
      .then(posts => posts
        .filter(post => post.userId === userId));
}

export function getPostDetails(postId) {
  return request(`/posts/${postId}`);
}
