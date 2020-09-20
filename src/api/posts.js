import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const posts = await fetch(`${BASE_URL}/posts`);

  if (userId) {
    return posts.json()
      .then(result => (
        result.data.filter(post => post.userId === userId)));
  }

  return posts.json()
    .then(result => result.data);
};

export const getPostDetails = async(userId) => {
  const posts = await fetch(`${BASE_URL}/posts/${userId}`);

  return posts.json()
    .then(result => result.data);
};
