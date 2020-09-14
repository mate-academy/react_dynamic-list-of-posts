import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const comments = response.json()
    .then(base => base.data.filter(comment => comment.postId === postId));

  return comments;
};

export const addComment = async(postId, name, email, body) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'post',
    body: JSON.stringify({
      postId, name, email, body,
    }),
  });

  return response.json();
};

export const removeComment = async(commentId) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'delete',
  });

  return response.json();
};
