'use_strict';

import { request } from './api';

export const getUserPosts = (userId) => {
  let postsFromServer;

  if (!userId) {
    postsFromServer = request('/posts');
  } else {
    postsFromServer = request(`/posts?userId=${userId}`);
  }

  return postsFromServer;
};

export const getUsers = () => {
  const usersFromServer = request('/users')
    .then(users => users.filter(user => user.address !== null))
    .then(users => users.sort((a, b) => a.id - b.id));

  return usersFromServer;
};

export const getPostDetails = postId => request(`/posts/${postId}`);
