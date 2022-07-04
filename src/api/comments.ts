import { BASE_URL } from './api';

export async function getPostComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
}

export async function createPostComments(comment: NewComment) {
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const newComment = await response.json();

    return newComment;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return null;
}

export async function deletePostComments(id: number) {
  return fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });
}
