export const BASE_URL = 'https://mate.academy/students-api';

export async function getAllComments(postId: number): Promise<PostComment[]> {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
}

export async function addComment(
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<PostComment[]> {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return response.json();
}

export async function deleteComment(commentId: number) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });

  return response.json();
}
