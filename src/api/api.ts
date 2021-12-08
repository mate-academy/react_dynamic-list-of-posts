import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

export const API_URL = 'https://mate.academy/students-api';

export function get<T>(url: string): Promise<T> {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json());
}

export function getPosts(ending: string) {
  return get<Post[]>(`/posts${ending}`);
}

export function getPostComments() {
  return get<Comment[]>('/comments');
}

export function deleteComment(commentId: number) {
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function addComment(
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> {
  return fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  })
    .then(response => response.json());
}
