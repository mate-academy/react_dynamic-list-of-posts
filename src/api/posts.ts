import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const response = userId !== 0
    ? await fetch(`${BASE_URL}/posts?userId=${userId}`)
    : await fetch(`${BASE_URL}/posts`);

  if (response.ok) {
    return response.json();
  }

  return [];
};
