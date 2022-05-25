/* eslint-disable no-console */
import { posts } from '../data/postsData';
import { users } from '../data/usersData';
import { comments } from '../data/commentsData';

export const addPosts = async () => {
  posts.forEach(async (post) => {
    await fetch('https://mate.academy/students-api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export const addUsers = async () => {
  users.forEach(async (user) => {
    await fetch('https://mate.academy/students-api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export const addComments = async () => {
  comments.forEach(async (comment) => {
    await fetch('https://mate.academy/students-api/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};
