import { BASE_URL } from './api';

export const getUserPosts = userId => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then((posts) => {
    if (userId === '0') {
      return posts.data;
    }

    return posts.data.filter(post => post.userId.toString() === userId);
  });

export const getPostDetails = postId => fetch(`${BASE_URL}/posts/${postId}`)
  .then(response => response.json());
