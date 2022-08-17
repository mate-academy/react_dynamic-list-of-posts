import { Comment } from '../types/Comment';

import { request } from './request';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number): Promise<Comment[]> => {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = (
  postId: number, name: string, email: string, body: string,
): Promise<Comment[]> => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
