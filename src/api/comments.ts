import { request } from './api';

export const loadComments = (postId: number): Promise<Comment[]> => {
  return request(`comments?postId=${postId}`);
};

export const rmComment = (id: number): Promise<Comment> => {
  return request(`comments/${id}`, { method: 'DELETE' });
};

export const addNewComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment> => {
  return request('comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
