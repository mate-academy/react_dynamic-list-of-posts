import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  const result = data.data;

  if (userId !== '0') {
    const filteredPostsByUser = result.filter(post => post.userId === +userId);

    return filteredPostsByUser;
  }

  return result;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const data = await response.json();

  return data.data;
};
