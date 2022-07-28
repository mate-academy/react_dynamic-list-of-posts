import { Comment } from '../types/comment';

export const BASE_URL = 'https://mate.academy/students-api';

const reject = {
  Error: 'Something gone wrong',
  status: 418,
};

export function getUserPosts(userId: number) {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(res => res.json())
    .catch(() => reject);
}

export function getPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .catch(() => reject);
}

export function getUsers() {
  return fetch(`${BASE_URL}/users`)
    .then(res => res.json())
    .catch(() => reject);
}

export function getPostDetails(postId: number) {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(res => res.json())
    .catch(() => reject);
}

export function getPostComments(postId: number) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(res => res.json())
    .catch(() => reject);
}

export function deleteComment(commentId: number) {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
}

export function addComment(comment: Comment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  });
}
