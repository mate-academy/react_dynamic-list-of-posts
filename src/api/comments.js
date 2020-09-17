import { BASE_URL } from './api';

export const getPostComments = id => fetch(`${BASE_URL}comments/`)
  .then(response => response.json())
  .then(result => result.data.filter(comment => comment.postId === id));

export const deletePostComment = id => fetch(`${BASE_URL}comments/${id}`,
  { method: 'DELETE' });

export const addPostComment = newComment => fetch(`${BASE_URL}comments/`,
  {
    method: 'POST', body: JSON.stringify(newComment),
  });
