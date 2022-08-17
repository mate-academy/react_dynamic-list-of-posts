import { request } from './api';

export const getPostComments = async (postId: number): Promise<PostComment[]> => {
  return request(`comments?postId=${postId}`);
};

export const deleteComment = async (commentId: number) => {
  return request(`comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = async (comment: Omit<PostComment, 'id'>) => {
  return request('comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
