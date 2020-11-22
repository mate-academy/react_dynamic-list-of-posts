import { BASE_URL } from './api';

const getPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();

  return posts.data;
};

export const getUserPosts = async(selectedUserId) => {
  const posts = await getPosts();

  if (selectedUserId) {
    return posts.filter(post => post.userId === selectedUserId);
  }

  return posts;
};

export const getPostDetails = async(selectedPostId) => {
  const response = await fetch(`${BASE_URL}/posts/${selectedPostId}`);
  const postDetails = await response.json();

  return postDetails.data;
};
