import { request } from './posts';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};

export const allComments = () => {
  return request('/comments');
};

export const removeComments = (postId: number) => {
  return request(`/comments/${postId}`, { method: 'DELETE' });
};

export const addPostComent = (
  postId:number,
  name: string,
  email: string,
  body: string,
) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
