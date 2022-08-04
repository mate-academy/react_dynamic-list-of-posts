import { remove, request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const addPostComment = (newComment: Partial<PostComment>) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId: newComment.postId,
      name: newComment.name,
      email: newComment.email,
      body: newComment.body,
    }),
  });
};

export const removePostComment = (commentId: number) => {
  return remove(`/comments/${commentId}`);
};
