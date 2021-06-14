import { getData } from './api';

export const getPosts = async() => {
  const postsFromServer = await getData('/posts');

  return postsFromServer;
};

export const getUserPosts = async(userId) => {
  const posts = await getData(`/posts?userId=${userId}`);

  return posts;
};

export const getPostDetails = async(selectedPost) => {
  const postFromServer = await getData(`/posts/${selectedPost}`);

  return postFromServer;
};
