import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const comments = await fetch(`${BASE_URL}/comments`);
  const responce = await comments.json();
  const preparedComments = await responce.data;

  if (postId === 0) {
    return preparedComments;
  }

  return preparedComments.filter(comment => comment.postId === postId);
};

export const addPostComment = async(postId, name, email, body) => {
  const url = `${BASE_URL}/comments/`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      postId, name, email, body,
    }),
  };

  const responce = await fetch(url, options);
  const comments = await responce.json();

  return comments.data;
};

export const deletePostComment = async(commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  const comments = await fetch(url, options);

  return comments;
};
