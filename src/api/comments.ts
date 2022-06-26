import { BASE_URL } from './api';

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

export async function createPostComments(comment: NewComment) {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const res = await response.json();

  return res;
}

export async function deletePostComments(id: number) {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
}
