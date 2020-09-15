import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const result = await response.json();

  return postId
    ? result.data.filter(comment => comment.postId === postId)
    : '';
};

async function getCommentFromServer(commentId, options) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, options);
  const result = await response.json();

  return result.data;
}

export function deleteComment(commentId) {
  return getCommentFromServer(commentId, {
    method: 'DELETE',
  });
}

export function addComment(postId, name, email, body) {
  return getCommentFromServer('', {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
