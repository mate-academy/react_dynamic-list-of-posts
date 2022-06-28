import { BASE_URL } from './api';

export function getPostComments(postId: number): Promise<Comment[]> {
  return fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(request => {
      if (!request.ok) {
        throw new Error('Something went wrong.');
      }

      return request.json();
    });
}

export async function createPostComments(comment: NewComment) {
  const request = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const res = await request.json();

  return res;
}

export async function deletePostComments(id: number) {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
}
