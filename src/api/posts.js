import { BASE_URL } from './api';

export const getUserPosts = function(userId) {
  return fetch(`${BASE_URL}/posts/?userId=${userId}`)
    .then(response => response.json())
    .then(response => response.data);
};

export const getAllPosts = function() {
  return fetch(`${BASE_URL}/posts/`)
    .then(response => response.json())
    .then(response => response.data);
};

export const getPostDetails = function(postId) {
  return fetch(`${BASE_URL}/posts/?id=${postId}`)
    .then(response => response.json())
    .then(response => response.data[0].body)
    /* eslint handle-callback-err: "warn" */
    .catch(error => '');
};
