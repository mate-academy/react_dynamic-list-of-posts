import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};
