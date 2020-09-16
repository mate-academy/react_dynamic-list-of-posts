import { BASE_URL } from './api';

const POSTS_URL = `${BASE_URL}/posts`;

async function sendRequest(path) {
  const response = await fetch(path);
  const result = await response.json();

  return result.data;
}

export const getUserPosts = userId => (
  sendRequest(POSTS_URL)
    .then(result => (
      !userId
        ? result
        : result.filter(usersPost => usersPost.userId === userId)
    ))
);

export const getPostDetails = postId => sendRequest(`${POSTS_URL}/${postId}`)
  .then(result => result);
