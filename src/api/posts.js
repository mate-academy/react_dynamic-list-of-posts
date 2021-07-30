import { BASE_URL } from './api';

// eslint-disable-next-line arrow-body-style
export const getAllPosts = () => {
  return fetch(`${BASE_URL}/posts`)
    .then(response => response.json())
    .then(result => result.data);
};

export const getUserPosts = async(userId) => {
  const allPosts = await getAllPosts();
  const userPosts = allPosts.filter(post => post.userId === userId);

  return userPosts;
};
