import { request } from './api';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');

  return comments.data.filter(comment => comment.postId === postId);
};

export const deleteCommentFromServer = async(commentId) => {
  const result = await request(`/comments/${commentId}`, {
    method: 'DELETE',
  });

  return result.data;
};

export const postCommentToServer = async(data) => {
  const result = await request('/comments', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return result.data;
};
