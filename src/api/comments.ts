import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const url = `${BASE_URL}/comments?postId=${postId}`;
  const response = await fetch(url);

  return response.json();
};
