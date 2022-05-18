import { request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const postNewComment = (
  postId: number,
  body: string,
  email: string,
  name: string,
) => {
  return request('/comments', {
    method: 'POST',
    body: JSON.stringify({
      postId,
      body,
      email,
      name,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
