import { request } from './api';

const query = '/posts';

export function getPosts() {
  return request(query);
}

export function getUserPosts(id) {
  return getPosts()
    .then(result => result.filter(post => post.userId === id));
}

export function getPost(id) {
  return request(`${query}/${id}`);
}
