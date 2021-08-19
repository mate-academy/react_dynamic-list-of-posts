import { BASE_URL } from './api';

const request = url => fetch(url)
  .then(response => response.json());

export const getUserPosts = (userId) => {
  const url = `${BASE_URL}/posts/`;

  return request(url)
    .then(response => (+userId
      ? response.data.filter(post => post.userId === +userId)
      : response.data));
};

export const getPostDetails = (postId) => {
  const url = `${BASE_URL}/posts/${postId}`;

  return request(url)
    .then(response => response.data);
};
