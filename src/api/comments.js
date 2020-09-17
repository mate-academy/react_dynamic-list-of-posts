import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments`);
  const result = await response.json();
  const { data } = result;

  return data.filter(comment => comment.postId === postId);
};
