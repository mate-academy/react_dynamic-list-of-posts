import { Comment } from '../types/Comment';
import { request } from './api';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return request(`comments?postId=${postId}`);
};

export const addComment = (
  id: string,
  postId: number,
  name: string,
  email: string,
  body: string,
) => (
  request('comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id,
      postId,
      name,
      email,
      body,
    }),
  })
);

export const deleteComment = (commentId: string) => {
  return request(`comments/${commentId}`, {
    method: 'DELETE',
  });
};
