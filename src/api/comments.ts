export const BASE_URL = 'https://mate.academy/students-api/comments';

export async function getPostComments(postId: number) {
  const post = await fetch(`${BASE_URL}?postId=${postId}`);

  return post.json();
}

export function deleteComment(commentId: number) {
  return fetch(`${BASE_URL}/${commentId}`, {
    method: 'DELETE',
  });
}

export async function postComment(
  postId: number,
  name: string,
  email: string,
  body: string,
) {
  const response = await fetch(BASE_URL, {
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

  return response.json();
}
