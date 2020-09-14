import { BASE_URL } from './api';

export const getAllPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!userId) {
    const posts = response.json().then(obj => obj.data);

    return posts;
  }

  const posts = response.json().then(obj => (
    obj.data.filter(post => post.userId === userId)
  ));

  return posts;
};

export const getPostDetails = async(PostId) => {
  const response = await fetch(`${BASE_URL}/posts/${PostId}`);

  return response.json();
};
