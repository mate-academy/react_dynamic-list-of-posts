import { BASE_URL } from './api';

export function getUserPosts(userId: number): Promise<Post[]> {
  return fetch(`${BASE_URL}/posts${userId === 0 ? '' : `?userId=${userId}`}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong.');
      } else {
        return response.json();
      }
    });
}

export function getPostComments(postId: number): Promise<Comment[]> {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong.');
      } else {
        return response.json();
      }
    });
}

export function createPostComments(comment: NewComment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json());
}

export function deletePostComments(id: number) {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
}
