import { BASE_URL, fetchData } from './api';

const POST_REQUEST_URL = `${BASE_URL}/posts`;

export const getAllPosts = async() => {
  const posts = await fetchData(POST_REQUEST_URL);

  return posts.data;
};

export const getUserPosts = async(userId) => {
  const posts = await getAllPosts();

  if (!userId) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const post = await fetchData(`${POST_REQUEST_URL}/${postId}`);

  return post;
};
