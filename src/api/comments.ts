import { BASE_URL } from './api';

export function getPostComments(postId: number) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(response => response.json());
}

export const addNewComment = (comment: Partial<PostComment>) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ ...comment }),
  })
    .then(res => res.json());
};

export const deleteComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(post => post.json());
};
