const BASE_URL = 'https://mate.academy/students-api';

export async function getPostComments(postId: number): Promise<Commentary[]> {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
}

export function removeComment(commentId: number) {
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
}

type Data = Pick<Commentary, 'name' | 'email' | 'body' | 'postId'>;

export async function addComment(data: Data) {
  const param = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };
  const result = await fetch(`${BASE_URL}/comments`, param);

  return result.json();
}
