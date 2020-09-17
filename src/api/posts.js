import { BASE_URL } from './api.js'

export const getUserPosts = async(userId) => {
  const data = await fetch(`${BASE_URL}/posts`);
  const result = await data.json();
  const posts = await result.data;

  if (userId === 0) {
      return posts;
  }

  return posts.filter(post => post.userId === userId);
};
