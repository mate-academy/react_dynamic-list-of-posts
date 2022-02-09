import { BASE_URL } from './posts';

export const getPostComments = async (postId: number) => {
  const postComments = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return postComments.json();
};

export const removePostComment = async (commentId: number) => {
  const postComment = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });

  return postComment.json();
};

export const addPostComment = async (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  const newComment = await fetch(`${BASE_URL}/comments`, {
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

  return newComment.json();
};
