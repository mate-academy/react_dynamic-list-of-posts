import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const fetchedData = +userId === 0
    ? await fetch(`${BASE_URL}/posts/`)
    : await fetch(`${BASE_URL}/posts?userId=${userId}`);

  const posts = await fetchedData.json();

  return posts.data;
};

export const getPostDetails = async(postId) => {
  const fetchedData = await fetch(`${BASE_URL}/posts/${postId}`);
  const posts = await fetchedData.json();

  return posts.data;
};
