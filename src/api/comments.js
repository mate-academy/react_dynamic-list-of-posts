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

export const addPostComment = async(selectedPostId, name, email, body) => {
  const url = `${BASE_URL}/comments/`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      selectedPostId, name, email, body,
    }),
  };

  return fetch(url, options);
};

export const deletePostComment = async(commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  const comments = await fetch(url, options);

  return comments;
};
