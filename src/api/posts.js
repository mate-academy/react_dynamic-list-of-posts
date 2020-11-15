import { BASE_URL } from './api';

export const getPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error(`${response.status} - Posts is ${response.statusText}`);
  }

  const json = await response.json();

  const posts = json.data;

  if (userId === 'All') {
    return posts;
  }

  return posts.filter(post => post.userId === +userId);
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - Post is ${response.statusText}`);
  }

  const json = await response.json();

  return json.data;
};
