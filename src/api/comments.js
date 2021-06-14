import { getData } from './api';

export const getComments = async(selectedPostId) => {
  const comments = await getData(`/comments?postId=${selectedPostId}`);

  return comments;
};
