import { request } from './api';

export const getComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (id: number) => {
  return request(`/comments/${id}`, {
    method: 'DELETE',
  });
};

export const postComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  return request('/comments', {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
