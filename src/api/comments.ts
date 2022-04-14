import { BASE_URL } from './api';

export const getPostComments = async (postId: number | 0) => {
  const response = await fetch(`
  ${BASE_URL}/comments?postId=${postId}
  `);

  if (!response.ok) {
    throw new Error(`Status: ${response.status}
      - StatusText: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
