import { BASE_URL, request } from './api';

export async function getPostComments(postId : number) {
  const result = await request(`comments?postId=${postId}`);

  return result;
}

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
