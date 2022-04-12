import { BASE_URL } from './api';

export const getPostComments = async (id: number) => {
  const response = await fetch(`${BASE_URL}/comments`);

  const comments = await response.json();

  return comments.filter((comment: CommentInfo) => comment.postId === id);
};

export const removeComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });

  return response.json();
};

export const addComment = async (postId: number, name: string, email: string, body:string) => {
  const response = await fetch(`${BASE_URL}/comments`, {
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
};
