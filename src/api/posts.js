import { BASE_URL, request } from './api';

export function getPosts() {
  return request(`${BASE_URL}/posts`);
}

export function getUserPosts(userId) {
  return getPosts()
    .then(posts => posts.filter(post => (
      post.userId === userId
    )));
}

export function getPostDetails(postId) {
  return request(`${BASE_URL}/posts/${postId}`);
}
