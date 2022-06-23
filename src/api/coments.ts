import { BASE_URL } from './api';

export const getPostComments = async (postId:number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deletePostComment = async (commentId:number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });

  return response.json();
};

export const addNewComment = async (newComment:NewComment) => {
  const response = await fetch(`${BASE_URL}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },

    body: JSON.stringify(newComment),
  });

  return response.json();
};
