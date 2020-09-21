import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await (await fetch(`${BASE_URL}/posts`)).json();
  const result = response.data;

  if (userId !== '0') {
    const filteredPostsByUser = result.filter(post => post.userId === +userId);

    return filteredPostsByUser;
  }

  return result;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const result = await response.json();

  return result.data;
};
