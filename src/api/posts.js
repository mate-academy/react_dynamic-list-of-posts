import { request } from './api';

const endPoint = '/posts';

export function getPosts() {
  return request(endPoint);
}

export function getUserPosts(userId) {
  return getPosts()
    .then((result) => {
      const sortedPosts = result.filter(post => (
        post.userId === userId
      ));

      return sortedPosts;
    });
}

export function getPostDetails(postId) {
  return request(`${endPoint}/${postId}`);
}
