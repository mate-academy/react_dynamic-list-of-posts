import { BASE_URL, request } from './api';
import { Comment } from '../types/comment';

export async function getPostComments(postId: number) {
  return request<Comment[]>(`${BASE_URL}/comments?postId=${postId}`);
}
