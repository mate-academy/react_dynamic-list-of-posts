import { request } from './api';

export const getPostComments = (postId: number): Promise<Comments[]> => {
  return request(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return request(`/comments/${commentId}`, { method: 'DELETE' });
};

export const addComment = async (comment: Comments) => {
  return request(
    '/comments',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(comment),
    },
  );
};
