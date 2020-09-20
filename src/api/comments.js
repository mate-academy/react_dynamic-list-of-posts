import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const result = await response.json();

  return postId
    ? result.data.filter(comment => comment.postId === postId)
    : '';
};

async function makeOperationWithComment(commentId, options) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, options);
  const result = await response.json();

  return result.data;
}

export function deleteComment(commentId) {
  return makeOperationWithComment(commentId, {
    method: 'DELETE',
  });
}

// export function addComment(postId, name, email, body) {
//   return makeOperationWithComment('', {
//     method: 'POST',
//     body: JSON.stringify({
//       postId,
//       name,
//       email,
//       body,
//     }),
//   });
// }

export function addComment(postId, { name, email, body }) {
  return makeOperationWithComment('', {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}
