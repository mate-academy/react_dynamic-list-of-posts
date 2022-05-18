import { request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const deletePostComments = (commentsId: number) => {
  return request(`/comments/${commentsId}`, { method: 'DELETE' });
};

export const addPostComments = (
  postId: number,
  name: string,
  body: string,
  email: string,
) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      body,
      email,
    }),
  });
};
