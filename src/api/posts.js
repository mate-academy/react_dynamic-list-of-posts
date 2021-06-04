import { getData } from './handleData';

export function getUserPosts(id = '') {
  return getData(`/posts/${id}`);
}
