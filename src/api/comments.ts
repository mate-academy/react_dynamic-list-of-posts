import { BASE_URL } from './api';
import { request } from './posts';

export const getPostComments = (postId: number) => request(`${BASE_URL}/comments?postId=${postId}`);

export const createComment = async (newComment: NewComment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });

  return response.json();
};

export const deletePostComment = (commentId: number) => {
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};
