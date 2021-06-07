import { BASE_URL } from './api';

export const getPosts = () => (
  fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(result => result.data)
);

export const getUserPosts = userId => (
  getPosts()
    .then(result => result.filter(post => post.userId === userId))
);

export const getPost = postId => (
  fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(result => result.data)
);

export const getPostComments = postId => (
  fetch(`${BASE_URL}/comments`)
    .then(response => response.json())
    .then(result => result.data)
    .then(comments => comments.filter(comment => comment.postId === postId))
);

export const deleteComment = commentId => (
  fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(result => result.data)
);

export const addComment = data => (
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(result => result.data)
);
