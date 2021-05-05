import { BASE_URL, request } from './api';

export function getAllPosts() {
  return request(`${BASE_URL}/posts`);
}

export function getUserPosts(userId) {
  return getAllPosts()
    .then(posts => posts.filter(
      post => (post.userId === userId),
    ));
}
