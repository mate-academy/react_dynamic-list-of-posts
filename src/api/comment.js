import { request } from './post';

const BASE_URL = `https://mate-api.herokuapp.com`;

export const getPostComments = async(postId) => {
  const comments = await request('/comments');

  return (
    postId
      ? comments.filter(comment => comment.postId === postId)
      : comments
  );
};

export const deleteComment = async(commentId) => {
  await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = async(comment) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
