import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const userPosts = (userId === 0)
    ? await fetch(`${BASE_URL}/posts`)
    : await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return userPosts.json();
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const postsDetails = await fetch(`${BASE_URL}/posts/${postId}`);

  return postsDetails.json();
};
