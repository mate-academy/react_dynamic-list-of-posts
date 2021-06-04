import { getData, remove, post } from './handleData';

export function getPostComments() {
  return getData('/comments');
}

export function deleteComment(id) {
  return remove('/comments/', id);
}

export function postComment(body) {
  return post('/comments', '', body);
}
