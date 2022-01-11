import { BASE_URL, getData } from './api';

export const getUserPosts = async (userId: number | null = null) => {
  const userPostsUrl = userId
    ? `${BASE_URL}/posts/?userId=${userId}`
    : `${BASE_URL}/posts/`;

  return getData(userPostsUrl);
};

export const getPostDetails = async (postId: number) => {
  const postUrl = `${BASE_URL}/posts/${postId}`;

  return getData(postUrl);
};
