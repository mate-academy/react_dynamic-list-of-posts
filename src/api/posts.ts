export const BASE_URL = 'https://mate.academy/students-api';

export const getAllPosts = async () => {
  const posts = await fetch(`${BASE_URL}/posts`);

  return posts.json();
};

export const getUserPosts = async (userId: number) => {
  if (!userId) {
    return getAllPosts();
  }

  const userPosts = await fetch((`${BASE_URL}/posts?userId=${userId}`));

  return userPosts.json();
};

export const getPostDetails = async (postId: number) => {
  const postDetails = await fetch(`${BASE_URL}/posts/${postId}`);

  return postDetails.json();
};
