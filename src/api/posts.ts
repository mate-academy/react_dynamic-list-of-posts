const BASE_URL = 'https://mate.academy/students-api';

export const loadUsersPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const loadUserPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
