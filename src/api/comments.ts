import { Data } from '../types/Data';
import { request, post, remove } from './api';

export function getPostComments(postId: number) {
  return request(`/comments?postId=${postId}`);
}

export function removeComment(commentId: number) {
  return remove(`/comments/${commentId}`);
}

export function addComment(data: Data) {
  return post('/comments', data);
}
