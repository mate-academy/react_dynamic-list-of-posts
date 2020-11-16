import { request, postRequest, removeRequest } from './api';

const apiSection = '/comments/';

export const getPostComments = async(postId) => {
  const comments = await request(apiSection);

  if (!postId) {
    return [];
  }

  return comments.filter(comment => comment.postId === postId);
};

export const addComment = async newComment => postRequest(apiSection, {
  ...newComment,
});

export const removeComment = async commentId => removeRequest(
  `${apiSection}${commentId}`,
);
