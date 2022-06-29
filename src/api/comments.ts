import { BASE_URL } from './api';

export async function postComment(
  name : string, email : string, body : string, postId: number,
) {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
