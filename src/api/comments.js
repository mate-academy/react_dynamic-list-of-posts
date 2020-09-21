import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const responce = await fetch(`${BASE_URL}/comments`);
  const comments = await responce.json();

  return comments.data
    .filter(comment => comment.postId === postId);
};

export const deleteComment = async(commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  const responce = await fetch(url, options);
  const comments = await responce.json();

  return comments.data;
};

export const addComment = async(
  postId,
  name,
  email,
  body,
) => {
  const url = `${BASE_URL}/comments`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  };

  const responce = await fetch(url, options);
  const comments = await responce.json();

  return comments.data;
};
