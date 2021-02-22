'use_strict';

import { request } from './api';

export const getUserPosts = (userId) => {
  const postsFromServer = request('/posts')
    .then((posts) => {
      if (+userId > 0) {
        return posts.filter(post => post.userId === +userId);
      }

      return posts;
    });

  return postsFromServer;
};

export const getUsers = () => {
  const usersFromServer = request('/users')
    .then(users => users.filter(user => user.address !== null))
    .then(users => users.sort((a, b) => a.id - b.id));

  return usersFromServer;
};

export const getPostDetails = postId => request(`/posts/${postId}`);
