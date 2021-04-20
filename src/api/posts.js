import { BASE_URL, request } from './api';

export function getUserPosts(userId) {
  return request(`${BASE_URL}/posts`)
    .then(posts => posts.filter(user => (
      user.address.userId === userId
    )));
}

export function getPostDetails(postId) {
  return request(`${BASE_URL}/posts/${postId}`);
}
