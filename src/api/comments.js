import { BASE_URL } from './api';

export const getPostComments = async(postId) => {
  const response = await fetch(`${BASE_URL}/comments/`);
  const postComments = await response.json();

  const filteredPostComments = postComments.data.filter(postComment => (
    postComment.postId === Number(postId)));

  return filteredPostComments;
};
