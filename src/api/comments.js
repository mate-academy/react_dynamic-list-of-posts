import { request, BASE_URL } from './api';

export function getPostComments(postId) {
  return request(`/comments/`)
    .then(comments => comments
      .filter(comment => comment.postId === postId));
}

export const addPostComment = async(postId, name, email, body) => {
  const url = `${BASE_URL}/comments/`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      postId, name, email, body,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(result => result.data);
};

export const deletePostComment = async(commentId) => {
  const url = `${BASE_URL}/comments/${commentId}`;
  const options = {
    method: 'DELETE',
  };

  const response = await fetch(url, options);
  const comments = await response.json();

  return comments.data;
};
