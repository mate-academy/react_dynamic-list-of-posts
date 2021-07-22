import { BASE_URL } from './api';

export const getPostsUser = async(userId) => {
  const result = await fetch(`${BASE_URL}/posts/`)
    .then(response => response.json())
    .then(response => response.data)
    .then(response => response.filter(elem => (
      !userId || +elem.userId === +userId)));

  return result;
};

export const getPostDetails = async(postId) => {
  const result = await fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(response => response.data);

  return result;
};
