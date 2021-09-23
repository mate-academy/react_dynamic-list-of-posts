import { BASE_URL } from './api';

export const getPostComments = async (postId: number) => {
  const comments = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  if (comments.ok) {
    return comments.json();
  }

  return [];
};
