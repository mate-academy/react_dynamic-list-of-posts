import { request } from './posts';
import { BASE_URL } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

export const addPostComment = async(data) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result.data;
};

export const deletePostComment = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  });
  const result = await response.json();

  return result.data;
};
