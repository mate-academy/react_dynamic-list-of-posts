import { BASE_URL } from './posts';

export const getPostComments = async (postId: number) => {
  const postComments = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return postComments.json();
};
