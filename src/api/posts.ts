import { BASE_URL } from './api';

export const getUserPosts = (userId: number) => {
  return fetch(`${BASE_URL}/posts`)
    .then(data => data.json())
    .then(result => {
      if (userId) {
        return result.filter((post: { userId: number; }) => post.userId === userId);
      }

      return result;
    });
};

export const getPostDetails = (postId: number) => {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(data => {
      return postId === 0 ? data : data.json();
    })
    .then(result => result);
};
