import { BASE_URL } from './api';

export const getComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);

  if (!response.ok) {
    throw new Error(`${response.status} - Comments is ${response.statusText}`);
  }

  const json = await response.json();

  const comments = json.data;

  return comments.filter(comment => comment.postId === postId);
};

export const deleteComment = id => (
  fetch(
    `${BASE_URL}/comments/${id}`,
    {
      method: 'DELETE',
    },
  ));

export const postComment = comment => (
  fetch(
    `${BASE_URL}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(comment),
    },
  )
);
