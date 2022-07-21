import { BASE_URL, request } from './api';

export async function getPostComments(postId: number) {
  return request(`${BASE_URL}/comments?postId=${postId}`);
}
