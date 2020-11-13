import { request } from './api';

const POSTS_URL = '/posts';

export const getUserPosts = async(userId) => {
  const posts = await request(POSTS_URL);

  return (+userId !== 0)
    ? posts.data.filter(post => +userId === post.userId)
    : posts.data;
};

export const getPostDetails = async(postId) => {
  const post = await request(`${POSTS_URL}/${postId}`);

  return post.data;
};
