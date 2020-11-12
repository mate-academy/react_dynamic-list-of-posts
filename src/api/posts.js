import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts/`);
  const userPosts = await response.json();

  if (Number(userId) === 0) {
    return userPosts.data;
  }

  const filteredUserPosts = userPosts.data.filter(userPost => (
    userPost.userId === Number(userId)));

  return filteredUserPosts;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const postDetails = await response.json();

  return postDetails.data;
};
