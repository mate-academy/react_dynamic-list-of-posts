import { Comment } from '../types/Comment';
import { BASE_URL, getData } from './api';

export const getAllComments = () => getData<Comment[]>('/comments');

export const getPostComments = (postId: number) => getData<Comment[]>(`/comments?postId=${postId}`);

export function deletePostComment(commentId: number) {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
}

export function createPostComment(obj: Comment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(obj),
  });
}
