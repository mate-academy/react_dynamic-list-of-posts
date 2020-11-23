import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const comments = await response.json();
  const filteredComments = comments.data
    .filter(comment => comment.postId === postId);

  return filteredComments;
};

export const deletePostComment = async(commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };
  const comments = await fetch(url, options);

  return comments;
};

export const addPostComment = async(postId, name, email, body) => {
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
  const comments = await fetch(url, options);

  return comments;
};
