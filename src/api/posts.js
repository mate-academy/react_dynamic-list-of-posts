import { getData } from './handleData';

export function getUserPosts(id = '') {
  return getData(`/posts/${id}`);
}

export function getUserPostsWithQuery(query) {
  return getData(`/posts?userId=${query}`);
}
