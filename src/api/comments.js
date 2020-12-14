import { request } from './api';

export const getPostComments = async(postId) => {
  const result = await request(`comments/`);

  return result.filter(res => res.postId === postId);
};

export const addComment = async(option) => {
  await request(`comments/`, {
    method: 'POST',
    body: JSON.stringify(option),
  });
};

export const deleteComment = async(commentId) => {
  await request(`comments/${commentId}`, {
    method: 'DELETE',
  });
};
