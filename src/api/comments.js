import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const data = await response.json();

  return data.data.filter(comment => comment.postId === postId);
};

export const addPostComments = (newComment) => {
  const url = `${BASE_URL}/comments`;
  const options = {
    method: 'POST',
    body: JSON.stringify(newComment),
  };

  return fetch(url, options)
    .then(result => result.json());
};

export const deletePostComments = (commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  return fetch(url, options)
    .then(result => result.json());
};
