import { BASE_URL } from './api';

export const GetUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then(user => (userId === 0
    ? user.data
    : user.data.filter(post => post.userId === userId)));

async function sendRequest(path) {
  const response = await fetch(path);
  const result = await response.json();

  return result.data;
}

export const getPostDetails = postId => (
  sendRequest(`${BASE_URL}/posts/${postId}`)
    .then(result => result)
);
