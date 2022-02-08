import { BASE_URL } from './api';

export async function getPostComments(postId: number) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  const postComments = await response.json();

  return postComments;
}

export async function deleteSelectedComment(postId: number) {
  const deleteResponse = await fetch(`${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  });
  const notPostComments = await deleteResponse.json();

  return notPostComments;
}

export async function createNewComment(
  newComment: NewComment,
) {
  const {
    postId,
    name,
    email,
    body,
  } = newComment;

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
