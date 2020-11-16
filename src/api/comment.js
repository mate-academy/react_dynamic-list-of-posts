import { request } from './post';

export const getPostComments = async(postId) => {
  const comments = await request('/comments');

  return (
    postId
      ? comments.filter(comment => comment.postId === postId)
      : comments
  );
};

export const deleteComment = async(commentId) => {
  const respones = await request(`comments/${commentId}`, {
    method: 'DELETE',
  });

  return respones;
};
