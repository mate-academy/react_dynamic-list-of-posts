/* eslint-disable no-console */
import { BASE_URL } from './api';

export const getPostComments = (postId: number) => (
  fetch(`${BASE_URL}/comments?postId=${postId}`)
    .then(resp => (
      resp.ok
        ? resp.json()
        : Promise.reject(new Error(`${resp.status}: ${resp.statusText}`))
    ))
    .catch(err => console.log(err))
);

export const deleteComment = (commentId: number) => (
  fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then(resp => resp.json())
    .then(() => console.log(`Comment #${commentId} deleted successfully`))
    .catch(err => console.log(err))
);

export const addComment = (comment: {
  postId: number,
  name: string,
  email: string,
  body: string,
}) => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }),
  })
    .then(resp => resp.json())
    .then(() => console.log('Comment added successfully'))
    .catch(err => console.log(err))
);
