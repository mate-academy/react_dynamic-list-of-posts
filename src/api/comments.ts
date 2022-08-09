export const BASE_URL = 'https://mate.academy/students-api/';

export async function getComments(postId: number) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function delComment(id : number) {
  const result = await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });

  return result;
}

export async function postComment(
  name : string,
  email : string,
  body : string,
  postId: number,
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
