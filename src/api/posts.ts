const BASE_URL = 'https://mate.academy/students-api';

export const getUserPosts = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
