import { BASE_URL } from './api';

const request = async (baseUrl: string) => {
  const response = await fetch(baseUrl);

  return response.json();
};

export const getUserPosts = () => request(`${BASE_URL}/posts`);

export const getPostDetails = (postId: number) => request(`${BASE_URL}/posts/${postId}`);

export const getPostComments = (postId: number) => request(`${BASE_URL}/comments?postId=${postId}`);

export const createComment = (newComment: NewComment) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const deletePostComment = (commentId: number) => {
  return fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });
};
