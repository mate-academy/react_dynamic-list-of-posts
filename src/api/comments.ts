import { request } from './posts';

export function getPostComments(postId: number) {
  return request(`/comments?postId=${postId}`);
}
