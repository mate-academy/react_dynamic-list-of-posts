import { request } from './api';

export const getComments = async (postId:number) => {
  const comments = await request('/comments');

  return comments.filter((comment: { postId: number; }) => comment.postId === postId);
};
